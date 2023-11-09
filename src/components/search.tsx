import * as React from "react";
import { Transition } from "@headlessui/react";
import cn from "clsx";
import type { KeyboardEvent, ReactElement, ComponentProps } from "react";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { renderComponent, renderString } from "../lib/render";
import { Input } from "./ui/input";
import { IS_BROWSER } from "@constants/index";

type SearchProps = {
  className?: string;
  overlayClassName?: string;
  value: string;
  onChange: (newValue: string) => void;
  onActive?: (active: boolean) => void;
  loading?: boolean;
  error?: boolean;
  results: any[];
  placeholder?: string;
};

const INPUTS = ["input", "select", "button", "textarea"];

export function Search({
  className,
  overlayClassName,
  value,
  onChange,
  onActive,
  loading,
  error,
  results,
  placeholder,
}: SearchProps): ReactElement {
  const [show, setShow] = useState(false);
  //   const config = useConfig();
  const [active, setActive] = useState(0);
  //   const router = useRouter();
  //   const { setMenu } = useMenu();
  const input = useRef<HTMLInputElement>(null);
  const ulRef = useRef<HTMLUListElement>(null);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    setActive(0);
  }, [value]);

  useEffect(() => {
    const down = (e: globalThis.KeyboardEvent): void => {
      const activeElement = document.activeElement as HTMLElement;
      const tagName = activeElement?.tagName.toLowerCase();
      if (
        !input.current ||
        !tagName ||
        INPUTS.includes(tagName) ||
        activeElement?.isContentEditable
      )
        return;
      if (
        e.key === "/" ||
        (e.key === "k" &&
          (e.metaKey /* for Mac */ || /* for non-Mac */ e.ctrlKey))
      ) {
        e.preventDefault();
        input.current.focus();
      } else if (e.key === "Escape") {
        setShow(false);
        input.current.blur();
      }
    };
    if (window) {
      window?.addEventListener("keydown", down);
      return () => {
        window?.removeEventListener("keydown", down);
      };
    }
  }, []);

  const finishSearch = useCallback(() => {
    input.current?.blur();
    onChange("");
    setShow(false);
    // setMenu(false);
  }, [
    onChange,
    // , setMenu
  ]);

  const handleActive = useCallback(
    (e: { currentTarget: { dataset: DOMStringMap } }) => {
      const { index } = e.currentTarget.dataset;
      setActive(Number(index));
    },
    []
  );

  const handleKeyDown = useCallback(
    function <T>(e: KeyboardEvent<T>) {
      if (IS_BROWSER) {
        switch (e.key) {
          case "ArrowDown": {
            if (active + 1 < results.length) {
              const el = ulRef?.current?.querySelector<HTMLAnchorElement>(
                `li:nth-of-type(${active + 2}) > a`
              );
              if (el) {
                e.preventDefault();
                handleActive({ currentTarget: el });
                el.focus();
              }
            }
            break;
          }
          case "ArrowUp": {
            if (active - 1 >= 0) {
              const el = ulRef?.current?.querySelector<HTMLAnchorElement>(
                `li:nth-of-type(${active}) > a`
              );
              if (el) {
                e?.preventDefault();
                handleActive({ currentTarget: el });
                el?.focus();
              }
            }
            break;
          }
          case "Enter": {
            const result = results[active];
            if (result) {
              window.location.href = result.route;
              finishSearch();
            }
            break;
          }
          case "Escape": {
            setShow(false);
            input.current?.blur();
            break;
          }
        }
      }
    },
    [active, results, finishSearch, handleActive]
  );

  const renderList = show && Boolean(value);

  const icon = IS_BROWSER && (
    <Transition
      show={true && (!show || Boolean(value))}
      as={Fragment}
      enter='transition-opacity'
      enterFrom='opacity-0'
      enterTo='opacity-100'
      leave='transition-opacity'
      leaveFrom='opacity-100'
      leaveTo='opacity-0'
    >
      <kbd
        className={cn(
          "absolute my-1.5 select-none right-1.5",
          "h-5 bg-primaryLightShade px-1.5 font-mono text-[10px] font-medium text-gray-500",
          "border border-primaryLightBorder",
          "contrast-more:border-current contrast-more:text-current contrast-more:dark:border-current",
          "items-center gap-1 transition-opacity",
          value
            ? "z-20 flex cursor-pointer hover:opacity-70"
            : "pointer-events-none hidden sm:flex"
        )}
        title={value ? "Clear" : undefined}
        onClick={() => {
          onChange("");
        }}
      >
        {value && focused
          ? "ESC"
          : true &&
            (window?.navigator.userAgent.includes("Macintosh") ? (
              <>
                <span className='text-xs'>⌘</span>K
              </>
            ) : (
              "CTRL K"
            ))}
      </kbd>
    </Transition>
  );

  return (
    <div className={cn("relative", className)}>
      {renderList && (
        <div className='fixed inset-0 z-10' onClick={() => setShow(false)} />
      )}

      <div className='relative flex items-center text-gray-900 contrast-more:text-gray-800 dark:text-gray-300 contrast-more:dark:text-gray-300'>
        <Input
          className='border border-primaryLightBorder bg-primaryLightShade focus-visible:ring-primaryRed'
          ref={input}
          value={value}
          onChange={(e) => {
            const { value } = e.target;
            onChange(value);
            setShow(Boolean(value));
          }}
          onFocus={() => {
            onActive?.(true);
            setFocused(true);
          }}
          onBlur={() => {
            setFocused(false);
          }}
          type='search'
          placeholder={renderString(placeholder || "Search docs...")}
          onKeyDown={handleKeyDown}
        />
        {/* {icon} */}
      </div>

      <Transition
        show={renderList}
        // Transition.Child is required here, otherwise popup will be still present in DOM after focus out
        as={Transition.Child}
        leave='transition-opacity duration-100'
        leaveFrom='opacity-100'
        leaveTo='opacity-0'
      >
        <ul
          className={cn(
            "wc-scrollbar",
            // Using bg-white as background-color when the browser didn't support backdrop-filter
            "border border-primaryLightBorder bg-primaryLightShade text-gray-100 dark:border-neutral-800 dark:bg-neutral-900",
            "absolute top-full z-20 mt-2 overflow-auto overscroll-contain py-2.5 shadow-xl",
            "max-h-[min(calc(50vh-11rem-env(safe-area-inset-bottom)),400px)]",
            "md:max-h-[min(calc(100vh-5rem-env(safe-area-inset-bottom)),400px)]",
            "inset-x-0 ltr:md:left-auto rtl:md:right-auto",
            "contrast-more:border contrast-more:border-gray-900 contrast-more:dark:border-gray-50",
            overlayClassName
          )}
          ref={ulRef}
          style={{
            transition: "max-height .2s ease", // don't work with tailwindcss
          }}
        >
          {error ? (
            <span className='flex select-none justify-center gap-2 p-8 text-center text-sm text-red-500'>
              <InformationCircleIcon className='h-5 w-5' />
              {renderString("Error!")}
            </span>
          ) : loading ? (
            <span className='flex select-none justify-center gap-2 p-8 text-center text-sm text-gray-400'>
              <SpinnerIcon className='h-5 w-5 animate-spin' />
              {renderComponent(
                <p className='text-gray-800 contrast-more:border-transparent dark:text-gray-300 mx-2.5 break-words contrast-more:border'>
                  Loading...
                </p>
              )}
            </span>
          ) : results.length > 0 ? (
            results.map(({ route, prefix, children, id }, i) => (
              <Fragment key={id}>
                {prefix}
                <li
                  className={cn(
                    "mx-2.5 break-words",
                    "contrast-more:border",
                    i === active
                      ? "bg-primaryRed/10 text-primaryRed font-medium contrast-more:border-primary-500"
                      : "text-gray-800 contrast-more:border-transparent dark:text-gray-300"
                  )}
                >
                  <a
                    className='block scroll-m-12 px-2.5 py-2'
                    href={route}
                    data-index={i}
                    onFocus={handleActive}
                    onMouseMove={handleActive}
                    onClick={finishSearch}
                    onKeyDown={handleKeyDown}
                  >
                    {children}
                  </a>
                </li>
              </Fragment>
            ))
          ) : (
            renderComponent(
              <li>
                <p className='text-gray-800 contrast-more:border-transparent dark:text-gray-300 mx-2.5 break-words contrast-more:border'>
                  No results found
                </p>
              </li>
            )
          )}
        </ul>
      </Transition>
    </div>
  );
}

export function SpinnerIcon(props: ComponentProps<"svg">): ReactElement {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      width='24'
      height='24'
      {...props}
    >
      <circle
        className='opacity-25'
        cx='12'
        cy='12'
        r='10'
        stroke='currentColor'
        strokeWidth='4'
      />
      <path
        className='opacity-75'
        fill='currentColor'
        d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
      />
    </svg>
  );
}

export function InformationCircleIcon(
  props: ComponentProps<"svg">
): ReactElement {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 20 20'
      fill='currentColor'
      width='20'
      height='20'
      {...props}
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z'
      />
    </svg>
  );
}
