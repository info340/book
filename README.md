# INFO 340: Client-Side Web Development

This repository contains the source code for the **INFO 340: Client-Side Web Development** course book. The published book can be viewed at **https://info340.github.io/**.

Note that **all** edited source files (including images and other assets) should be edited within the **root** folder; files in the `build` directory may be overwritten.

## Dependencies
You should be able to install all required R dependencies using [packrat](https://rstudio.github.io/packrat/): simply restart R (e.g., through an interactive session in the terminal) in order to automatically install the required libraries.

- If that doesn't work, you should be able to use the `packrat::restore()` function. You may need to do this through RStudio.
- For issues creating symlinks, [delete the `packrat/lib-R/` folder and reinitialize](https://stackoverflow.com/questions/37584783/r-packrat-fails-to-load-private-library)

Additionally, you may need to install the following libraries separately:

- [Pandoc](https://github.com/jgm/pandoc/releases/latest) (for compiling the R-Markdown). But you may just need to [specify the path](https://stackoverflow.com/questions/28432607/pandoc-version-1-12-3-or-higher-is-required-and-was-not-found-r-shiny/29710643#29710643).

- LaTeX for building to `pdf` ([MiKTeX](https://miktex.org/) for Windows, [MacTex](https://www.tug.org/mactex/) on Mac).

You will _also_ need to install node dependencies for Prism syntax highlighting:

```bash
npm install
```

## Building the Book
You can use the included [`Makefile`](https://en.wikipedia.org/wiki/Makefile) to build the book:

- **`make book`** to build the HTML version of the book (the output is saved in the saved in the repository's root folder).

- **`make pdf`** to build the PDF version of the book.

- **`make epub`** to build the epub version of the book.

- **`make all`** to build all versions of the book.

- **`make serve`** to serve a local copy of the book for development (with auto-refreshing browser).

- **`make deploy`** to publish the built book to `https://info340.github.io`.
