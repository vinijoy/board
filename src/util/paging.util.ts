export class PagingParam {
rowPerPage?: number;
pagePerGroup?: number;
totalRow: number;
page: number;
}

export class PagingResult {
page: number;
template: string;
startRow: number;
rowPerPage: number;
}

export class PagingUtil {
pagePerGroup = 5;

page = 1;
totalPage = 0;

group = 0;
totalGroup = 0;

paging(params: PagingParam): PagingResult {
const totalRow = Number(params.totalRow) || 0;
const rowPerPage = Number(params.rowPerPage) || 15;

this.page = Number(params.page) || 1;

this.totalPage = Math.ceil(totalRow / rowPerPage);
this.totalGroup = Math.ceil(this.totalPage / this.pagePerGroup);
this.group = Math.ceil(this.page / this.pagePerGroup);

const prevGroup = this.prevGroup();
const prevPage = this.prevPage();
const nextPage = this.nextPage();
const nextGroup = this.nextGroup();

const start = (this.group - 1) * this.pagePerGroup + 1;
const end = this.group * this.pagePerGroup > this.totalPage ? this.totalPage : this.group * this.pagePerGroup;

const startRow = (this.page - 1) * rowPerPage;

let template = '<ul>';

if (prevPage > -1) {
if (this.page === 1) {
template += `<li class="disabled"><a href="javascript:;" aria-label="이전"><i class="fa-solid fa-caret-left"></i></a></li>`;
} else {
template += `<li><a href="javascript:;" onclick="goPage(${prevPage})" aria-label="이전"><i class="fa-solid fa-caret-left"></i></a></li>`;
}
}

template += `<li><p class="pageination-txt">${this.page} of ${this.totalPage || 1}</p></li>`;

if (nextPage > -1) {
if (this.page === this.totalPage) {
template += `<li class="disabled"><a href="javascript:;" aria-label="다음"><i class="fa-solid fa-caret-right"></i></a></li>`;
} else {
template += `<li><a href="javascript:;" onclick="goPage(${nextPage})" aria-label="다음"><i class="fa-solid fa-caret-right"></i></a></li>`;
}
}

template += '</ul>';

return {
page: params.page,
template,
startRow,
rowPerPage,
};
}

prevGroup() {
if (this.group > 1) {
return (this.group - 1) * this.pagePerGroup;
}

return 1;
}

nextGroup() {
if (this.group < this.totalGroup) {
return this.group * this.pagePerGroup + 1;
}

return this.totalPage;
}

prevPage() {
if (this.page > 1) {
return this.page - 1;
}

return 1;
}

nextPage() {
if (this.page < this.totalPage) {
return this.page + 1;
}

return this.totalPage || 1;
}
}
