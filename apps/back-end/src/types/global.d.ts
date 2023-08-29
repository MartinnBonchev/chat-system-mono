export {};

declare global {
  type MaybeNullable<T> = T | null;

  type MaybeUndefined<T> = T | undefined;

  type Maybe<T> = MaybeNullable<T> | undefined;
}
