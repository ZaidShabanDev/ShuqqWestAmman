import * as Headless from '@headlessui/react';
import clsx from 'clsx';
import React, { forwardRef } from 'react';
import { Link } from './link';

const styles = {
  base: [
    // Base
    'relative isolate inline-flex shrink-0 items-center justify-center gap-x-2.5 rounded-full border ',
    // Sizing
    'px-[calc(--spacing(4)-1px)] py-[calc(--spacing(2.5)-1px)] sm:px-[calc(--spacing(5)-1px)] sm:text-sm/6',
    // Focus
    'focus:not-data-focus:outline-hidden data-focus:outline-2 data-focus:outline-offset-2 data-focus:outline-blue-500',
    // Disabled
    'data-disabled:opacity-50',
    // Icon
    '*:data-[slot=icon]:-mx-0.5 *:data-[slot=icon]:my-0.5 *:data-[slot=icon]:size-5 *:data-[slot=icon]:shrink-0 *:data-[slot=icon]:self-center sm:*:data-[slot=icon]:my-1 sm:*:data-[slot=icon]:size-4 forced-colors:[--btn-icon:ButtonText] forced-colors:data-hover:[--btn-icon:ButtonText]',
  ],
  solid: [
    // Optical border, implemented as the button background to avoid corner artifacts
    'border-transparent bg-(--btn-border)',
    // Dark mode: border is rendered on `after` so background is set to button background
    'dark:bg-(--btn-bg)',
    // Button background, implemented as foreground layer to stack on top of pseudo-border layer
    'before:absolute before:inset-0 before:-z-10 before:rounded-full before:bg-(--btn-bg)',
    // Background color is moved to control and shadow is removed in dark mode so hide `before` pseudo
    'dark:before:hidden',
    // Dark mode: Subtle white outline is applied using a border
    'dark:border-white/5',
    // Shim/overlay, inset to match button foreground and used for hover state + highlight shadow
    'after:absolute after:inset-0 after:-z-10 after:rounded-full',
    // White overlay on hover
    'data-active:after:bg-(--btn-hover-overlay) data-hover:after:bg-(--btn-hover-overlay)',
    // Dark mode: `after` layer expands to cover entire button
    'dark:after:-inset-px dark:after:rounded-full',
    // Disabled
    'data-disabled:before:shadow-none data-disabled:after:shadow-none',
  ],
  outline: [
    // Base
    'border-neutral-950/10 text-neutral-950 data-active:bg-neutral-950/[2.5%] data-hover:bg-neutral-950/[2.5%]',
    // Dark mode
    'dark:border-white/15 dark:text-white dark:[--btn-bg:transparent] dark:data-active:bg-white/5 dark:data-hover:bg-white/5',
    // Icon
    '[--btn-icon:var(--color-neutral-500)] data-active:[--btn-icon:var(--color-neutral-700)] data-hover:[--btn-icon:var(--color-neutral-700)] dark:data-active:[--btn-icon:var(--color-neutral-400)] dark:data-hover:[--btn-icon:var(--color-neutral-400)]',
  ],
  plain: [
    // Base
    'border-transparent text-neutral-950 data-active:bg-neutral-950/5 data-hover:bg-neutral-950/5',
    // Dark mode
    'dark:text-white dark:data-active:bg-white/10 dark:data-hover:bg-white/10',
    // Icon
    '[--btn-icon:var(--color-neutral-500)] data-active:[--btn-icon:var(--color-neutral-700)] data-hover:[--btn-icon:var(--color-neutral-700)] dark:[--btn-icon:var(--color-neutral-500)] dark:data-active:[--btn-icon:var(--color-neutral-400)] dark:data-hover:[--btn-icon:var(--color-neutral-400)]',
  ],
  colors: {
    'dark/neutral': [
      'text-white [--btn-bg:var(--color-neutral-900)] [--btn-border:var(--color-neutral-950)]/90 [--btn-hover-overlay:var(--color-white)]/10',
      'dark:text-white dark:[--btn-bg:var(--color-neutral-600)] dark:[--btn-hover-overlay:var(--color-white)]/5',
      '[--btn-icon:var(--color-neutral-400)] data-active:[--btn-icon:var(--color-neutral-300)] data-hover:[--btn-icon:var(--color-neutral-300)]',
    ],
    light: [
      'text-neutral-950 [--btn-bg:white] [--btn-border:var(--color-neutral-950)]/10 [--btn-hover-overlay:var(--color-neutral-950)]/[2.5%] data-active:[--btn-border:var(--color-neutral-950)]/15 data-hover:[--btn-border:var(--color-neutral-950)]/15',
      'dark:text-white dark:[--btn-hover-overlay:var(--color-white)]/5 dark:[--btn-bg:var(--color-neutral-800)]',
      '[--btn-icon:var(--color-neutral-500)] data-active:[--btn-icon:var(--color-neutral-700)] data-hover:[--btn-icon:var(--color-neutral-700)] dark:[--btn-icon:var(--color-neutral-500)] dark:data-active:[--btn-icon:var(--color-neutral-400)] dark:data-hover:[--btn-icon:var(--color-neutral-400)]',
    ],
    'dark/white': [
      'text-white [--btn-bg:var(--color-neutral-900)] [--btn-border:var(--color-neutral-950)]/90 [--btn-hover-overlay:var(--color-white)]/10',
      'dark:text-neutral-950 dark:[--btn-bg:white] dark:[--btn-hover-overlay:var(--color-neutral-950)]/5',
      '[--btn-icon:var(--color-neutral-400)] data-active:[--btn-icon:var(--color-neutral-300)] data-hover:[--btn-icon:var(--color-neutral-300)] dark:[--btn-icon:var(--color-neutral-500)] dark:data-active:[--btn-icon:var(--color-neutral-400)] dark:data-hover:[--btn-icon:var(--color-neutral-400)]',
    ],
    dark: [
      'text-white [--btn-bg:var(--color-neutral-900)] [--btn-border:var(--color-neutral-950)]/90 [--btn-hover-overlay:var(--color-white)]/10',
      'dark:[--btn-hover-overlay:var(--color-white)]/5 dark:[--btn-bg:var(--color-neutral-800)]',
      '[--btn-icon:var(--color-neutral-400)] data-active:[--btn-icon:var(--color-neutral-300)] data-hover:[--btn-icon:var(--color-neutral-300)]',
    ],
    white: [
      'text-neutral-950 [--btn-bg:white] [--btn-border:var(--color-neutral-950)]/10 [--btn-hover-overlay:var(--color-neutral-950)]/[2.5%] data-active:[--btn-border:var(--color-neutral-950)]/15 data-hover:[--btn-border:var(--color-neutral-950)]/15',
      'dark:[--btn-hover-overlay:var(--color-neutral-950)]/5',
      '[--btn-icon:var(--color-neutral-400)] data-active:[--btn-icon:var(--color-neutral-500)] data-hover:[--btn-icon:var(--color-neutral-500)]',
    ],
    zinc: [
      'text-white [--btn-hover-overlay:var(--color-white)]/10 [--btn-bg:var(--color-neutral-600)] [--btn-border:var(--color-neutral-700)]/90',
      'dark:[--btn-hover-overlay:var(--color-white)]/5',
      '[--btn-icon:var(--color-neutral-400)] data-active:[--btn-icon:var(--color-neutral-300)] data-hover:[--btn-icon:var(--color-neutral-300)]',
    ],
    indigo: [
      'text-white [--btn-hover-overlay:var(--color-white)]/10 [--btn-bg:var(--color-indigo-500)] [--btn-border:var(--color-indigo-600)]/90',
      '[--btn-icon:var(--color-indigo-300)] data-active:[--btn-icon:var(--color-indigo-200)] data-hover:[--btn-icon:var(--color-indigo-200)]',
    ],
    cyan: [
      'text-cyan-950 [--btn-bg:var(--color-cyan-300)] [--btn-border:var(--color-cyan-400)]/80 [--btn-hover-overlay:var(--color-white)]/25',
      '[--btn-icon:var(--color-cyan-500)]',
    ],
    red: [
      'text-white [--btn-hover-overlay:var(--color-white)]/10 [--btn-bg:var(--color-red-600)] [--btn-border:var(--color-red-700)]/90',
      '[--btn-icon:var(--color-red-300)] data-active:[--btn-icon:var(--color-red-200)] data-hover:[--btn-icon:var(--color-red-200)]',
    ],
    orange: [
      'text-white [--btn-hover-overlay:var(--color-white)]/10 [--btn-bg:var(--color-orange-500)] [--btn-border:var(--color-orange-600)]/90',
      '[--btn-icon:var(--color-orange-300)] data-active:[--btn-icon:var(--color-orange-200)] data-hover:[--btn-icon:var(--color-orange-200)]',
    ],
    amber: [
      'text-amber-950 [--btn-hover-overlay:var(--color-white)]/25 [--btn-bg:var(--color-amber-400)] [--btn-border:var(--color-amber-500)]/80',
      '[--btn-icon:var(--color-amber-600)]',
    ],
    yellow: [
      'text-yellow-950 [--btn-hover-overlay:var(--color-white)]/25 [--btn-bg:var(--color-yellow-300)] [--btn-border:var(--color-yellow-400)]/80',
      '[--btn-icon:var(--color-yellow-600)] data-active:[--btn-icon:var(--color-yellow-700)] data-hover:[--btn-icon:var(--color-yellow-700)]',
    ],
    lime: [
      'text-lime-950 [--btn-hover-overlay:var(--color-white)]/25 [--btn-bg:var(--color-lime-300)] [--btn-border:var(--color-lime-400)]/80',
      '[--btn-icon:var(--color-lime-600)] data-active:[--btn-icon:var(--color-lime-700)] data-hover:[--btn-icon:var(--color-lime-700)]',
    ],
    green: [
      'text-white [--btn-hover-overlay:var(--color-white)]/10 [--btn-bg:var(--color-green-600)] [--btn-border:var(--color-green-700)]/90',
      '[--btn-icon:var(--color-white)]/60 data-active:[--btn-icon:var(--color-white)]/80 data-hover:[--btn-icon:var(--color-white)]/80',
    ],
    emerald: [
      'text-white [--btn-hover-overlay:var(--color-white)]/10 [--btn-bg:var(--color-emerald-600)] [--btn-border:var(--color-emerald-700)]/90',
      '[--btn-icon:var(--color-white)]/60 data-active:[--btn-icon:var(--color-white)]/80 data-hover:[--btn-icon:var(--color-white)]/80',
    ],
    teal: [
      'text-white [--btn-hover-overlay:var(--color-white)]/10 [--btn-bg:var(--color-teal-600)] [--btn-border:var(--color-teal-700)]/90',
      '[--btn-icon:var(--color-white)]/60 data-active:[--btn-icon:var(--color-white)]/80 data-hover:[--btn-icon:var(--color-white)]/80',
    ],
    sky: [
      'text-white [--btn-hover-overlay:var(--color-white)]/10 [--btn-bg:var(--color-sky-500)] [--btn-border:var(--color-sky-600)]/80',
      '[--btn-icon:var(--color-white)]/60 data-active:[--btn-icon:var(--color-white)]/80 data-hover:[--btn-icon:var(--color-white)]/80',
    ],
    blue: [
      'text-white [--btn-hover-overlay:var(--color-white)]/10 [--btn-bg:var(--color-blue-600)] [--btn-border:var(--color-blue-700)]/90',
      '[--btn-icon:var(--color-blue-400)] data-active:[--btn-icon:var(--color-blue-300)] data-hover:[--btn-icon:var(--color-blue-300)]',
    ],
    violet: [
      'text-white [--btn-hover-overlay:var(--color-white)]/10 [--btn-bg:var(--color-violet-500)] [--btn-border:var(--color-violet-600)]/90',
      '[--btn-icon:var(--color-violet-300)] data-active:[--btn-icon:var(--color-violet-200)] data-hover:[--btn-icon:var(--color-violet-200)]',
    ],
    purple: [
      'text-white [--btn-hover-overlay:var(--color-white)]/10 [--btn-bg:var(--color-purple-500)] [--btn-border:var(--color-purple-600)]/90',
      '[--btn-icon:var(--color-purple-300)] data-active:[--btn-icon:var(--color-purple-200)] data-hover:[--btn-icon:var(--color-purple-200)]',
    ],
    fuchsia: [
      'text-white [--btn-hover-overlay:var(--color-white)]/10 [--btn-bg:var(--color-fuchsia-500)] [--btn-border:var(--color-fuchsia-600)]/90',
      '[--btn-icon:var(--color-fuchsia-300)] data-active:[--btn-icon:var(--color-fuchsia-200)] data-hover:[--btn-icon:var(--color-fuchsia-200)]',
    ],
    pink: [
      'text-white [--btn-hover-overlay:var(--color-white)]/10 [--btn-bg:var(--color-pink-500)] [--btn-border:var(--color-pink-600)]/90',
      '[--btn-icon:var(--color-pink-300)] data-active:[--btn-icon:var(--color-pink-200)] data-hover:[--btn-icon:var(--color-pink-200)]',
    ],
    rose: [
      'text-white [--btn-hover-overlay:var(--color-white)]/10 [--btn-bg:var(--color-rose-500)] [--btn-border:var(--color-rose-600)]/90',
      '[--btn-icon:var(--color-rose-300)] data-active:[--btn-icon:var(--color-rose-200)] data-hover:[--btn-icon:var(--color-rose-200)]',
    ],
    primary: [
      'text-white [--btn-hover-overlay:var(--color-white)]/10 [--btn-bg:var(--color-primary-500)] [--btn-border:var(--color-primary-600)]/90',
      '[--btn-icon:var(--color-primary-300)] data-active:[--btn-icon:var(--color-primary-200)] data-hover:[--btn-icon:var(--color-primary-200)]',
    ],
  },

  //
  baseForCircle: [
    // Base
    'relative isolate inline-flex shrink-0 items-center justify-center rounded-full border font-medium',
    // Sizing
    'size-10 text-sm/none',
    // Focus
    'focus:not-data-focus:outline-hidden data-focus:outline-2 data-focus:outline-offset-2 data-focus:outline-blue-500',
    // Disabled
    'data-disabled:opacity-50',
    // Icon
    '*:data-[slot=icon]:-mx-0.5 *:data-[slot=icon]:my-0.5 *:data-[slot=icon]:size-5 *:data-[slot=icon]:shrink-0 *:data-[slot=icon]:self-center sm:*:data-[slot=icon]:my-1 sm:*:data-[slot=icon]:size-5 forced-colors:[--btn-icon:ButtonText] forced-colors:data-hover:[--btn-icon:ButtonText]',
  ],
};

export type ButtonProps = (
  | { color?: keyof typeof styles.colors; outline?: never; plain?: never }
  | { color?: never; outline: true; plain?: never }
  | { color?: never; outline?: never; plain: true }
) & { className?: string; children: React.ReactNode } & (
    | Omit<Headless.ButtonProps, 'as' | 'className'>
    | Omit<React.ComponentPropsWithoutRef<typeof Link>, 'className'>
  );

export const Button = forwardRef(function Button(
  { color, outline, plain, className, children, ...props }: ButtonProps,
  ref: React.ForwardedRef<HTMLElement>
) {
  let classes = clsx(
    className,
    styles.base,
    outline ? styles.outline : plain ? styles.plain : clsx(styles.solid, styles.colors[color ?? 'dark/neutral'])
  );

  return 'href' in props ? (
    <Link {...props} className={classes} ref={ref as React.ForwardedRef<HTMLAnchorElement>}>
      <TouchTarget>{children}</TouchTarget>
    </Link>
  ) : (
    <Headless.Button {...props} className={clsx(classes, 'cursor-default')} ref={ref}>
      <TouchTarget>{children}</TouchTarget>
    </Headless.Button>
  );
});

export type ButtonCircleProps = (
  | { color?: keyof typeof styles.colors; outline?: never; plain?: never }
  | { color?: never; outline: true; plain?: never }
  | { color?: never; outline?: never; plain: true }
) & { className?: string; children?: React.ReactNode } & (
    | Omit<Headless.ButtonProps, 'as' | 'className'>
    | Omit<React.ComponentPropsWithoutRef<typeof Link>, 'className'>
  );
export const ButtonCircle = forwardRef(function Button(
  { color, outline, plain, className, children = 'x', ...props }: ButtonCircleProps,
  ref: React.ForwardedRef<HTMLElement>
) {
  let classes = clsx(
    className,
    styles.baseForCircle,
    outline ? styles.outline : plain ? styles.plain : clsx(styles.solid, styles.colors[color ?? 'dark/neutral'])
  );

  return 'href' in props ? (
    <Link {...props} className={classes} ref={ref as React.ForwardedRef<HTMLAnchorElement>}>
      <TouchTarget>{children}</TouchTarget>
    </Link>
  ) : (
    <Headless.Button {...props} className={clsx(classes, 'cursor-default')} ref={ref}>
      <TouchTarget>{children}</TouchTarget>
    </Headless.Button>
  );
});

/**
 * Expand the hit area to at least 44×44px on touch devices
 */
export function TouchTarget({ children }: { children: React.ReactNode }) {
  return (
    <>
      <span
        className="absolute top-1/2 left-1/2 size-[max(100%,2.75rem)] -translate-x-1/2 -translate-y-1/2 [@media(pointer:fine)]:hidden"
        aria-hidden="true"
      />
      {children}
    </>
  );
}
