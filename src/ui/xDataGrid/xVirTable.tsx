import { defineComponent } from "vue";
import { _ } from "../loadCommonUtil";
import $ from "jquery"

export const xVirTable = defineComponent({
    props: ["configs"],
    mounted() {
        this.initStyle()
    },
    computed: {
        /* 组件唯一标识 */
        xVirTableId(): string {
            return `xVirTableId_${this._.uid}`;
        },
        columnOrder() {
            if (this.configs?.columnOrder) {
                return this.configs?.columnOrder
            }
            return Object.keys(this.configs?.columns)
        },
        columnWidthArray() {
            return _.map(this.columnOrder, prop => {
                return { width: "100px" };
            })
        },
        vDomThead() {
            return (<div role="thead" class="xVirTable-thead" >
                <div role="tr" class="flex horizon">
                    {_.map(this.columnOrder, (prop: string, index: number) => {
                        const column = this.configs?.columns[prop];
                        return (<div role="th" class="xVirTable-cell" data-index={index} data-prop={column.prop} >
                            {column.label}
                        </div>)
                    })}
                </div>
            </div>);
        },
        vDomBodyTr() {
            return _.map(this.configs.dataSource, (data, indexRow) => {
                const vDomTrTds = _.map(this.columnOrder, (prop: string, index: number) => {
                    const column = this.configs?.columns[prop];
                    return (<div role="td" class="xVirTable-cell" data-index={index} data-prop={column.prop}>
                        {data[prop]}
                    </div>)
                })
                return (<div role="tr" class="xVirTable-row flex horizon" data-row-key={indexRow}  >
                    {vDomTrTds}
                </div>);
            })

        },
        vDomBody() {
            return (<div role="tbody" class="xVirTable-tbody">
                {this.vDomBodyTr}
            </div>);
        },
        vDomMainTable() {
            return (<div id={this.xVirTableId} class="xVirTable-wrapper">
                {/* 滑动条有6px  */}
                <div role="table" class="xVirTable-header-wrapper" style="overflow: hidden;padding-right: 6px;">
                    {this.vDomThead}
                </div>
                <div role="table" class="xVirTable-body-wrapper" style="overflow: auto scroll; max-height: 300px" >
                    {/* 虚拟列表 start*/}
                    {this.vDomBody}
                    {/* 虚拟列表 end */}
                </div>
            </div>
            );
        },
        styleContent() {
            return [
                // `#${this.xVirTableId} *{ outline:1px solid red; }`,
                `#${this.xVirTableId} div[role=tr] div[role=td]{ width:300px;flex:1;overflow:hidden; }`,
                `#${this.xVirTableId} div[role=tr] div[role=th]{ width:300px;flex:1;overflow:hidden; }`,
            ].join("\n");
        }
    },
    watch: {
        styleContent() {
            this.updateStyle(this.styleContent);
        }
    },
    methods: {
        initStyle() {
            const $form = $(`#${this.xVirTableId}`);
            const $style = $("<style/>", { id: `style_${this.xVirTableId}` }).append(
                this.styleContent
            );
            $form.prepend($style);
        },
        updateStyle(styleContent: string) {
            const $style = $(`#style_${this.xVirTableId}`);
            $style.html(styleContent);
        }
    },
    render() {
        return (
            this.vDomMainTable
        );
    }

})