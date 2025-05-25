<h1 style="text-align: center;">📋🕵</h1>
<h1 style="text-align: center;">Clipboard Inspector</h1>

Simple website/[PWA](https://en.wikipedia.org/wiki/Progressive_web_app) to show you the
the different representations of what is on your clipboard.

# What is this good for? 🤷‍♀️

**TLDR;**

> It lets you go Sherlock Holmes on your clipboard. - @jsnel

Ever noticed that when you copy a code snippet from your editor or something from a website
into an application that has rich text formatting (e.g. gmail or word) it also copies the
formatting?

This is because your clipboard stores multiple [representations](https://www.w3.org/TR/clipboard-apis/#list-of-representations)
of its content and the applications can decide which one to use when you paste it.

Ok so that is a thing but what is this for?
Mostly just my own curiosity which application adds which data to the clipboard
(also gave me an excuse to try out [svelte](https://svelte.dev/) 🤓).

# FAQ 🤔

## Q: Is my data read by anyone else when I use this?

A: **No**: Everything happens inside of you browser and never leaves your system.
A server is only needed to serve the static files and if you install the PWA to check for updates.

## Q: Does it only work if I'm online?

A: **Depends**: If you use it directly from the gh-pages website yes.
If you install it as PWA you can also use it offline.

## Q: What actual problem does this help me with?

A: My original use case was to:

- Copy data from a system that doesn't natively support markdown (yeah looking at you Jira)
- Convert it to markdown so I can comfortably edit it in my editor
- Convert it back to a format that renders nicely like HTML

For such a use case this project can serve as a development tool to quickly inspect which
representations are on you clipboard and what you could do with them.
