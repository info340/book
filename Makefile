# build as gitbook
#pushd src; make; popd;

book:
	Rscript -e "bookdown::render_book('index.Rmd', 'bookdown::gitbook', quiet=T)";

pdf:
	Rscript -e "bookdown::render_book('index.Rmd', 'bookdown::pdf_book', quiet=T)";

epub:
	Rscript -e "bookdown::render_book('index.Rmd', 'bookdown::epub_book', quiet=T)";

all: pdf epub book

serve:
	Rscript -e "bookdown::serve_book(dir='.', output_dir='build', preview=TRUE, in_session=TRUE)";

deploy: #all
	git subtree push --prefix build https://github.com/info343/info343.github.io master
