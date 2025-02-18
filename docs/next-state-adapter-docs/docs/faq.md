---
title: "FAQ"
sidebar_label: "FAQ"
---

# Frequently Asked Questions

## What is `next-state-adapter`?

`next-state-adapter` is a state management adapter designed for Next.js App Router, enabling efficient state handling in both Server and Client Components.

## Why should I use `next-state-adapter`?

It simplifies state management in Next.js applications by providing an easy way to manage server-side and client-side state, ensuring efficient hydration and reactivity.

## Is `next-state-adapter` suitable for large-scale applications?

Yes, it is designed to scale with your application. It works well with both small projects and complex, data-intensive applications.

## Does it support both Server and Client Components?

Yes, `next-state-adapter` is designed to work seamlessly with both Server and Client Components in the Next.js App Router.

## How does `next-state-adapter` handle server-side data?

It allows you to hydrate the client store with server-side data using the `useStoreHydration` hook, ensuring a smooth transition between server and client states.

## Can I use `next-state-adapter` with MobX or Zustand?

Yes, it is flexible and can integrate with other state management solutions such as MobX and Redux, allowing you to use familiar patterns in your application.

## Is `next-state-adapter` compatible with Next.js Pages Router?

No, it is specifically designed for the Next.js App Router (`app/` directory) and takes advantage of its features.

## Does `next-state-adapter` require a specific store implementation?

No, you can use it with any store that follows the expected structure. It is agnostic to the specific implementation details of your store.

## How do I migrate an existing project to `next-state-adapter`?

You can gradually integrate `next-state-adapter` by wrapping your components with the `StoreProvider` and replacing direct state management with hooks like `useStore` and `useStoreHydration`.

## Where can I get support if I have issues?

You can check the official documentation, GitHub issues, or community discussions for help and support.

