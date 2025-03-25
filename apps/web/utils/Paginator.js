class Paginator {
    constructor(collection, perPage) {
        this.collection = collection;
        this.perPage = perPage;
        this.totalPages = Math.ceil(collection.length / perPage);
    }

    static PageNotIntegerError = class extends Error {
        constructor(value) {
            super(`Page number must be an integer, got: ${value}`);
            this.name = "PageNotIntegerError";
        }
    }

    static EmptyPageError = class extends Error {
        constructor(value, totalPages) {
            super(`Page number greater than total number of pages, got: ${value}, max: ${totalPages}`);
            this.name = "EmptyPageError";
        }
    }

    page(pageNumber) {
        if (isNaN(pageNumber) || !Number.isInteger(Number(pageNumber))) {
            throw new Paginator.PageNotIntegerError(pageNumber);
        }
        if (pageNumber > this.totalPages) {
            throw new Paginator.EmptyPageError(pageNumber, this.totalPages);
        }
        if (pageNumber <= 0) pageNumber = 1;

        const offset = (pageNumber - 1) * this.perPage;
        return this.collection.slice(offset, offset + this.perPage);
    }
}

module.exports = Paginator;