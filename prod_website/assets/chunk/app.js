import { _ as __vitePreload } from "../../index.js";
const AppStyle = "";
const routes = [
  { path: "/Dev", component: () => __vitePreload(() => import("./Dev.js"), true ? ["./Dev.js","..\\..\\index.js","..\\css\\Dev.css"] : void 0, import.meta.url) },
  { path: "/Dev/a", component: () => __vitePreload(() => import("./Dev.js"), true ? ["./Dev.js","..\\..\\index.js","..\\css\\Dev.css"] : void 0, import.meta.url) },
  { path: "/Dev/b/a", component: () => __vitePreload(() => import("./Dev.js"), true ? ["./Dev.js","..\\..\\index.js","..\\css\\Dev.css"] : void 0, import.meta.url) },
  { path: "/Dev/b/b", component: () => __vitePreload(() => import("./Dev.js"), true ? ["./Dev.js","..\\..\\index.js","..\\css\\Dev.css"] : void 0, import.meta.url) },
  { path: "/Dev/b/c/a", component: () => __vitePreload(() => import("./Dev.js"), true ? ["./Dev.js","..\\..\\index.js","..\\css\\Dev.css"] : void 0, import.meta.url) },
  { path: "/Dev/b/c/b", component: () => __vitePreload(() => import("./Dev.js"), true ? ["./Dev.js","..\\..\\index.js","..\\css\\Dev.css"] : void 0, import.meta.url) },
  {
    category: "inset",
    path: "/xDirective",
    component: () => __vitePreload(() => import("./DemoDirective.js"), true ? [] : void 0, import.meta.url)
  },
  {
    category: "inset",
    path: "/xIcon",
    component: () => __vitePreload(() => import("./DemoXIcon.js"), true ? ["./DemoXIcon.js","..\\..\\index.js"] : void 0, import.meta.url)
  },
  {
    category: "inset",
    path: "/xButton",
    component: () => __vitePreload(() => import("./DemoXButton.js"), true ? ["./DemoXButton.js","..\\..\\index.js"] : void 0, import.meta.url)
  },
  {
    category: "inset",
    path: "/xDialog",
    component: () => __vitePreload(() => import("./DemoDialog.js"), true ? ["./DemoDialog.js","..\\..\\index.js"] : void 0, import.meta.url)
  },
  {
    category: "inset",
    path: "/xForm",
    component: () => __vitePreload(() => import("./DemoXForm.js"), true ? ["./DemoXForm.js","..\\..\\index.js"] : void 0, import.meta.url)
  },
  {
    category: "inset",
    path: "/xDataGrid",
    component: () => __vitePreload(() => import("./DemoXDataGrid.js"), true ? ["./DemoXDataGrid.js","..\\..\\index.js"] : void 0, import.meta.url)
  },
  {
    category: "plugin",
    path: "/xMenuTree",
    component: () => __vitePreload(() => import("./DemoxMenuTree.js"), true ? ["./DemoxMenuTree.js","..\\..\\index.js"] : void 0, import.meta.url)
  }
];
const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes
});
const _sfc_main$3 = Vue.defineComponent({
  data() {
    return {
      routes,
      selectedKeys1: Vue.ref(["1"]),
      selectedKeys2: Vue.ref(["1"]),
      collapsed: Vue.ref(false),
      openKeys: Vue.ref(["sub1"]),
      menus: [{ to: "xIcon" }, { to: "xButton" }, { to: "xDataGrid" }]
    };
  },
  methods: {
    openStatsDialog() {
      VentoseUI.UI.layer.open({
        type: VentoseUI.UI.layer.IFRAME,
        maxmin: true,
        fullscreen: true,
        content: ["./assets/libs/dist_VentoseUI/VentoseUI_stats.html", ""]
      });
    }
  }
});
const AppLayout_vue_vue_type_style_index_0_lang = "";
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _hoisted_1$1 = { class: "padding10" };
const _hoisted_2$1 = { class: "flex middle" };
const _hoisted_3 = /* @__PURE__ */ Vue.createElementVNode("span", { class: "ml4" }, "\u5355\u7EC4\u4EF6", -1);
const _hoisted_4 = { class: "flex middle" };
const _hoisted_5 = /* @__PURE__ */ Vue.createElementVNode("span", { class: "ml4" }, "\u9700\u8981\u5355\u72EC\u5F15\u7528", -1);
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_xButton = Vue.resolveComponent("xButton");
  const _component_ElHeader = Vue.resolveComponent("ElHeader");
  const _component_xIcon = Vue.resolveComponent("xIcon");
  const _component_RouterLink = Vue.resolveComponent("RouterLink");
  const _component_ElMenuItem = Vue.resolveComponent("ElMenuItem");
  const _component_ElSubMenu = Vue.resolveComponent("ElSubMenu");
  const _component_ElMenu = Vue.resolveComponent("ElMenu");
  const _component_ElAside = Vue.resolveComponent("ElAside");
  const _component_RouterView = Vue.resolveComponent("RouterView");
  const _component_ElScrollbar = Vue.resolveComponent("ElScrollbar");
  const _component_ElContainer = Vue.resolveComponent("ElContainer");
  return Vue.openBlock(), Vue.createBlock(_component_ElContainer, {
    class: "flex vertical",
    style: { "height": "100vh" }
  }, {
    default: Vue.withCtx(() => [
      Vue.createVNode(_component_ElHeader, {
        style: { "background-color": "black" },
        class: "flex start middle"
      }, {
        default: Vue.withCtx(() => [
          Vue.createElementVNode("div", _hoisted_1$1, [
            Vue.createVNode(_component_xButton, { onClick: _ctx.openStatsDialog }, {
              default: Vue.withCtx(() => [
                Vue.createTextVNode(" \u5206\u6790\u62A5\u544A ")
              ]),
              _: 1
            }, 8, ["onClick"])
          ])
        ]),
        _: 1
      }),
      Vue.createVNode(_component_ElContainer, {
        class: "flex1",
        style: { "height": "1px" }
      }, {
        default: Vue.withCtx(() => [
          Vue.createVNode(_component_ElAside, { width: "200px" }, {
            default: Vue.withCtx(() => [
              Vue.createVNode(_component_ElMenu, { "default-active": "" }, {
                default: Vue.withCtx(() => [
                  Vue.createVNode(_component_ElSubMenu, { index: "sub1" }, {
                    title: Vue.withCtx(() => [
                      Vue.createElementVNode("span", _hoisted_2$1, [
                        Vue.createVNode(_component_xIcon, { icon: "UserOutlined" }),
                        _hoisted_3
                      ])
                    ]),
                    default: Vue.withCtx(() => [
                      (Vue.openBlock(true), Vue.createElementBlock(Vue.Fragment, null, Vue.renderList(_ctx.routes.filter((i) => i.category == "inset"), (menu) => {
                        return Vue.openBlock(), Vue.createBlock(_component_ElMenuItem, {
                          key: menu.path,
                          index: menu.path
                        }, {
                          default: Vue.withCtx(() => [
                            Vue.createVNode(_component_RouterLink, {
                              to: menu.path
                            }, {
                              default: Vue.withCtx(() => [
                                Vue.createTextVNode(Vue.toDisplayString(menu.path), 1)
                              ]),
                              _: 2
                            }, 1032, ["to"])
                          ]),
                          _: 2
                        }, 1032, ["index"]);
                      }), 128))
                    ]),
                    _: 1
                  }),
                  Vue.createVNode(_component_ElSubMenu, { index: "sub2" }, {
                    title: Vue.withCtx(() => [
                      Vue.createElementVNode("span", _hoisted_4, [
                        Vue.createVNode(_component_xIcon, { icon: "UserOutlined" }),
                        _hoisted_5
                      ])
                    ]),
                    default: Vue.withCtx(() => [
                      (Vue.openBlock(true), Vue.createElementBlock(Vue.Fragment, null, Vue.renderList(_ctx.routes.filter((i) => i.category == "plugin"), (menu) => {
                        return Vue.openBlock(), Vue.createBlock(_component_ElMenuItem, {
                          index: menu.path,
                          key: menu.path
                        }, {
                          default: Vue.withCtx(() => [
                            Vue.createVNode(_component_RouterLink, {
                              to: menu.path
                            }, {
                              default: Vue.withCtx(() => [
                                Vue.createTextVNode(Vue.toDisplayString(menu.path), 1)
                              ]),
                              _: 2
                            }, 1032, ["to"])
                          ]),
                          _: 2
                        }, 1032, ["index"]);
                      }), 128))
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          Vue.createVNode(_component_ElScrollbar, { class: "flex1" }, {
            default: Vue.withCtx(() => [
              Vue.createVNode(_component_RouterView)
            ]),
            _: 1
          })
        ]),
        _: 1
      })
    ]),
    _: 1
  });
}
const AppLayout = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$1]]);
const _sfc_main$2 = /* @__PURE__ */ Vue.defineComponent({
  __name: "App",
  setup(__props) {
    $("#app").removeClass("x-loading");
    return (_ctx, _cache) => {
      return Vue.openBlock(), Vue.createBlock(AppLayout);
    };
  }
});
const App_vue_vue_type_style_index_0_scoped_fbbb3f7f_lang = "";
const App = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-fbbb3f7f"]]);
const marked = function(root) {
  var block = {
    newline: /^\n+/,
    code: /^( {4}[^\n]+\n*)+/,
    fences: /^ {0,3}(`{3,}|~{3,})([^`~\n]*)\n(?:|([\s\S]*?)\n)(?: {0,3}\1[~`]* *(?:\n+|$)|$)/,
    hr: /^ {0,3}((?:- *){3,}|(?:_ *){3,}|(?:\* *){3,})(?:\n+|$)/,
    heading: /^ {0,3}(#{1,6}) +([^\n]*?)(?: +#+)? *(?:\n+|$)/,
    blockquote: /^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/,
    list: /^( {0,3})(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,
    html: "^ {0,3}(?:<(script|pre|style)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?\\?>\\n*|<![A-Z][\\s\\S]*?>\\n*|<!\\[CDATA\\[[\\s\\S]*?\\]\\]>\\n*|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:\\n{2,}|$)|<(?!script|pre|style)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:\\n{2,}|$)|</(?!script|pre|style)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:\\n{2,}|$))",
    def: /^ {0,3}\[(label)\]: *\n? *<?([^\s>]+)>?(?:(?: +\n? *| *\n *)(title))? *(?:\n+|$)/,
    nptable: noop,
    table: noop,
    lheading: /^([^\n]+)\n {0,3}(=+|-+) *(?:\n+|$)/,
    _paragraph: /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html)[^\n]+)*)/,
    text: /^[^\n]+/
  };
  block._label = /(?!\s*\])(?:\\[\[\]]|[^\[\]])+/;
  block._title = /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/;
  block.def = edit(block.def).replace("label", block._label).replace("title", block._title).getRegex();
  block.bullet = /(?:[*+-]|\d{1,9}\.)/;
  block.item = /^( *)(bull) ?[^\n]*(?:\n(?!\1bull ?)[^\n]*)*/;
  block.item = edit(block.item, "gm").replace(/bull/g, block.bullet).getRegex();
  block.list = edit(block.list).replace(/bull/g, block.bullet).replace(
    "hr",
    "\\n+(?=\\1?(?:(?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$))"
  ).replace("def", "\\n+(?=" + block.def.source + ")").getRegex();
  block._tag = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul";
  block._comment = /<!--(?!-?>)[\s\S]*?-->/;
  block.html = edit(block.html, "i").replace("comment", block._comment).replace("tag", block._tag).replace(
    "attribute",
    / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/
  ).getRegex();
  block.paragraph = edit(block._paragraph).replace("hr", block.hr).replace("heading", " {0,3}#{1,6} +").replace("|lheading", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}|~{3,})[^`\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|!--)").replace("tag", block._tag).getRegex();
  block.blockquote = edit(block.blockquote).replace("paragraph", block.paragraph).getRegex();
  block.normal = merge({}, block);
  block.gfm = merge({}, block.normal, {
    nptable: /^ *([^|\n ].*\|.*)\n *([-:]+ *\|[-| :]*)(?:\n((?:.*[^>\n ].*(?:\n|$))*)\n*|$)/,
    table: /^ *\|(.+)\n *\|?( *[-:]+[-| :]*)(?:\n((?: *[^>\n ].*(?:\n|$))*)\n*|$)/
  });
  block.pedantic = merge({}, block.normal, {
    html: edit(
      `^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`
    ).replace("comment", block._comment).replace(
      /tag/g,
      "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b"
    ).getRegex(),
    def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
    heading: /^ *(#{1,6}) *([^\n]+?) *(?:#+ *)?(?:\n+|$)/,
    fences: noop,
    paragraph: edit(block.normal._paragraph).replace("hr", block.hr).replace("heading", " *#{1,6} *[^\n]").replace("lheading", block.lheading).replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").getRegex()
  });
  function Lexer(options) {
    this.tokens = [];
    this.tokens.links = /* @__PURE__ */ Object.create(null);
    this.options = options || marked2.defaults;
    this.rules = block.normal;
    if (this.options.pedantic) {
      this.rules = block.pedantic;
    } else if (this.options.gfm) {
      this.rules = block.gfm;
    }
  }
  Lexer.rules = block;
  Lexer.lex = function(src, options) {
    var lexer = new Lexer(options);
    return lexer.lex(src);
  };
  Lexer.prototype.lex = function(src) {
    src = src.replace(/\r\n|\r/g, "\n").replace(/\t/g, "    ");
    return this.token(src, true);
  };
  Lexer.prototype.token = function(src, top) {
    src = src.replace(/^ +$/gm, "");
    var next, loose, cap, bull, b, item, listStart, listItems, t, space, i, tag, l, isordered, istask, ischecked;
    while (src) {
      if (cap = this.rules.newline.exec(src)) {
        src = src.substring(cap[0].length);
        if (cap[0].length > 1) {
          this.tokens.push({
            type: "space"
          });
        }
      }
      if (cap = this.rules.code.exec(src)) {
        var lastToken = this.tokens[this.tokens.length - 1];
        src = src.substring(cap[0].length);
        if (lastToken && lastToken.type === "paragraph") {
          lastToken.text += "\n" + cap[0].trimRight();
        } else {
          cap = cap[0].replace(/^ {4}/gm, "");
          this.tokens.push({
            type: "code",
            codeBlockStyle: "indented",
            text: !this.options.pedantic ? rtrim(cap, "\n") : cap
          });
        }
        continue;
      }
      if (cap = this.rules.fences.exec(src)) {
        src = src.substring(cap[0].length);
        this.tokens.push({
          type: "code",
          lang: cap[2] ? cap[2].trim() : cap[2],
          text: cap[3] || ""
        });
        continue;
      }
      if (cap = this.rules.heading.exec(src)) {
        src = src.substring(cap[0].length);
        this.tokens.push({
          type: "heading",
          depth: cap[1].length,
          text: cap[2]
        });
        continue;
      }
      if (cap = this.rules.nptable.exec(src)) {
        item = {
          type: "table",
          header: splitCells(cap[1].replace(/^ *| *\| *$/g, "")),
          align: cap[2].replace(/^ *|\| *$/g, "").split(/ *\| */),
          cells: cap[3] ? cap[3].replace(/\n$/, "").split("\n") : []
        };
        if (item.header.length === item.align.length) {
          src = src.substring(cap[0].length);
          for (i = 0; i < item.align.length; i++) {
            if (/^ *-+: *$/.test(item.align[i])) {
              item.align[i] = "right";
            } else if (/^ *:-+: *$/.test(item.align[i])) {
              item.align[i] = "center";
            } else if (/^ *:-+ *$/.test(item.align[i])) {
              item.align[i] = "left";
            } else {
              item.align[i] = null;
            }
          }
          for (i = 0; i < item.cells.length; i++) {
            item.cells[i] = splitCells(item.cells[i], item.header.length);
          }
          this.tokens.push(item);
          continue;
        }
      }
      if (cap = this.rules.hr.exec(src)) {
        src = src.substring(cap[0].length);
        this.tokens.push({
          type: "hr"
        });
        continue;
      }
      if (cap = this.rules.blockquote.exec(src)) {
        src = src.substring(cap[0].length);
        this.tokens.push({
          type: "blockquote_start"
        });
        cap = cap[0].replace(/^ *> ?/gm, "");
        this.token(cap, top);
        this.tokens.push({
          type: "blockquote_end"
        });
        continue;
      }
      if (cap = this.rules.list.exec(src)) {
        src = src.substring(cap[0].length);
        bull = cap[2];
        isordered = bull.length > 1;
        listStart = {
          type: "list_start",
          ordered: isordered,
          start: isordered ? +bull : "",
          loose: false
        };
        this.tokens.push(listStart);
        cap = cap[0].match(this.rules.item);
        listItems = [];
        next = false;
        l = cap.length;
        i = 0;
        for (; i < l; i++) {
          item = cap[i];
          space = item.length;
          item = item.replace(/^ *([*+-]|\d+\.) */, "");
          if (~item.indexOf("\n ")) {
            space -= item.length;
            item = !this.options.pedantic ? item.replace(new RegExp("^ {1," + space + "}", "gm"), "") : item.replace(/^ {1,4}/gm, "");
          }
          if (i !== l - 1) {
            b = block.bullet.exec(cap[i + 1])[0];
            if (bull.length > 1 ? b.length === 1 : b.length > 1 || this.options.smartLists && b !== bull) {
              src = cap.slice(i + 1).join("\n") + src;
              i = l - 1;
            }
          }
          loose = next || /\n\n(?!\s*$)/.test(item);
          if (i !== l - 1) {
            next = item.charAt(item.length - 1) === "\n";
            if (!loose)
              loose = next;
          }
          if (loose) {
            listStart.loose = true;
          }
          istask = /^\[[ xX]\] /.test(item);
          ischecked = void 0;
          if (istask) {
            ischecked = item[1] !== " ";
            item = item.replace(/^\[[ xX]\] +/, "");
          }
          t = {
            type: "list_item_start",
            task: istask,
            checked: ischecked,
            loose
          };
          listItems.push(t);
          this.tokens.push(t);
          this.token(item, false);
          this.tokens.push({
            type: "list_item_end"
          });
        }
        if (listStart.loose) {
          l = listItems.length;
          i = 0;
          for (; i < l; i++) {
            listItems[i].loose = true;
          }
        }
        this.tokens.push({
          type: "list_end"
        });
        continue;
      }
      if (cap = this.rules.html.exec(src)) {
        src = src.substring(cap[0].length);
        this.tokens.push({
          type: this.options.sanitize ? "paragraph" : "html",
          pre: !this.options.sanitizer && (cap[1] === "pre" || cap[1] === "script" || cap[1] === "style"),
          text: this.options.sanitize ? this.options.sanitizer ? this.options.sanitizer(cap[0]) : escape(cap[0]) : cap[0]
        });
        continue;
      }
      if (top && (cap = this.rules.def.exec(src))) {
        src = src.substring(cap[0].length);
        if (cap[3])
          cap[3] = cap[3].substring(1, cap[3].length - 1);
        tag = cap[1].toLowerCase().replace(/\s+/g, " ");
        if (!this.tokens.links[tag]) {
          this.tokens.links[tag] = {
            href: cap[2],
            title: cap[3]
          };
        }
        continue;
      }
      if (cap = this.rules.table.exec(src)) {
        item = {
          type: "table",
          header: splitCells(cap[1].replace(/^ *| *\| *$/g, "")),
          align: cap[2].replace(/^ *|\| *$/g, "").split(/ *\| */),
          cells: cap[3] ? cap[3].replace(/\n$/, "").split("\n") : []
        };
        if (item.header.length === item.align.length) {
          src = src.substring(cap[0].length);
          for (i = 0; i < item.align.length; i++) {
            if (/^ *-+: *$/.test(item.align[i])) {
              item.align[i] = "right";
            } else if (/^ *:-+: *$/.test(item.align[i])) {
              item.align[i] = "center";
            } else if (/^ *:-+ *$/.test(item.align[i])) {
              item.align[i] = "left";
            } else {
              item.align[i] = null;
            }
          }
          for (i = 0; i < item.cells.length; i++) {
            item.cells[i] = splitCells(
              item.cells[i].replace(/^ *\| *| *\| *$/g, ""),
              item.header.length
            );
          }
          this.tokens.push(item);
          continue;
        }
      }
      if (cap = this.rules.lheading.exec(src)) {
        src = src.substring(cap[0].length);
        this.tokens.push({
          type: "heading",
          depth: cap[2].charAt(0) === "=" ? 1 : 2,
          text: cap[1]
        });
        continue;
      }
      if (top && (cap = this.rules.paragraph.exec(src))) {
        src = src.substring(cap[0].length);
        this.tokens.push({
          type: "paragraph",
          text: cap[1].charAt(cap[1].length - 1) === "\n" ? cap[1].slice(0, -1) : cap[1]
        });
        continue;
      }
      if (cap = this.rules.text.exec(src)) {
        src = src.substring(cap[0].length);
        this.tokens.push({
          type: "text",
          text: cap[0]
        });
        continue;
      }
      if (src) {
        throw new Error("Infinite loop on byte: " + src.charCodeAt(0));
      }
    }
    return this.tokens;
  };
  var inline = {
    escape: /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,
    autolink: /^<(scheme:[^\s\x00-\x1f<>]*|email)>/,
    url: noop,
    tag: "^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>",
    link: /^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/,
    reflink: /^!?\[(label)\]\[(?!\s*\])((?:\\[\[\]]?|[^\[\]\\])+)\]/,
    nolink: /^!?\[(?!\s*\])((?:\[[^\[\]]*\]|\\[\[\]]|[^\[\]])*)\](?:\[\])?/,
    strong: /^__([^\s_])__(?!_)|^\*\*([^\s*])\*\*(?!\*)|^__([^\s][\s\S]*?[^\s])__(?!_)|^\*\*([^\s][\s\S]*?[^\s])\*\*(?!\*)/,
    em: /^_([^\s_])_(?!_)|^\*([^\s*<\[])\*(?!\*)|^_([^\s<][\s\S]*?[^\s_])_(?!_|[^\spunctuation])|^_([^\s_<][\s\S]*?[^\s])_(?!_|[^\spunctuation])|^\*([^\s<"][\s\S]*?[^\s\*])\*(?!\*|[^\spunctuation])|^\*([^\s*"<\[][\s\S]*?[^\s])\*(?!\*)/,
    code: /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,
    br: /^( {2,}|\\)\n(?!\s*$)/,
    del: noop,
    text: /^(`+|[^`])(?:[\s\S]*?(?:(?=[\\<!\[`*]|\b_|$)|[^ ](?= {2,}\n))|(?= {2,}\n))/
  };
  inline._punctuation = `!"#$%&'()*+,\\-./:;<=>?@\\[^_{|}~`;
  inline.em = edit(inline.em).replace(/punctuation/g, inline._punctuation).getRegex();
  inline._escapes = /\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/g;
  inline._scheme = /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/;
  inline._email = /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/;
  inline.autolink = edit(inline.autolink).replace("scheme", inline._scheme).replace("email", inline._email).getRegex();
  inline._attribute = /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/;
  inline.tag = edit(inline.tag).replace("comment", block._comment).replace("attribute", inline._attribute).getRegex();
  inline._label = /(?:\[[^\[\]]*\]|\\.|`[^`]*`|[^\[\]\\`])*?/;
  inline._href = /<(?:\\[<>]?|[^\s<>\\])*>|[^\s\x00-\x1f]*/;
  inline._title = /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/;
  inline.link = edit(inline.link).replace("label", inline._label).replace("href", inline._href).replace("title", inline._title).getRegex();
  inline.reflink = edit(inline.reflink).replace("label", inline._label).getRegex();
  inline.normal = merge({}, inline);
  inline.pedantic = merge({}, inline.normal, {
    strong: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
    em: /^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/,
    link: edit(/^!?\[(label)\]\((.*?)\)/).replace("label", inline._label).getRegex(),
    reflink: edit(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", inline._label).getRegex()
  });
  inline.gfm = merge({}, inline.normal, {
    escape: edit(inline.escape).replace("])", "~|])").getRegex(),
    _extended_email: /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/,
    url: /^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,
    _backpedal: /(?:[^?!.,:;*_~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_~)]+(?!$))+/,
    del: /^~+(?=\S)([\s\S]*?\S)~+/,
    text: /^(`+|[^`])(?:[\s\S]*?(?:(?=[\\<!\[`*~]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@))|(?= {2,}\n|[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@))/
  });
  inline.gfm.url = edit(inline.gfm.url, "i").replace("email", inline.gfm._extended_email).getRegex();
  inline.breaks = merge({}, inline.gfm, {
    br: edit(inline.br).replace("{2,}", "*").getRegex(),
    text: edit(inline.gfm.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex()
  });
  function InlineLexer(links, options) {
    this.options = options || marked2.defaults;
    this.links = links;
    this.rules = inline.normal;
    this.renderer = this.options.renderer || new Renderer();
    this.renderer.options = this.options;
    if (!this.links) {
      throw new Error("Tokens array requires a `links` property.");
    }
    if (this.options.pedantic) {
      this.rules = inline.pedantic;
    } else if (this.options.gfm) {
      if (this.options.breaks) {
        this.rules = inline.breaks;
      } else {
        this.rules = inline.gfm;
      }
    }
  }
  InlineLexer.rules = inline;
  InlineLexer.output = function(src, links, options) {
    var inline2 = new InlineLexer(links, options);
    return inline2.output(src);
  };
  InlineLexer.prototype.output = function(src) {
    var out = "", link, text, href, title, cap, prevCapZero;
    while (src) {
      if (cap = this.rules.escape.exec(src)) {
        src = src.substring(cap[0].length);
        out += escape(cap[1]);
        continue;
      }
      if (cap = this.rules.tag.exec(src)) {
        if (!this.inLink && /^<a /i.test(cap[0])) {
          this.inLink = true;
        } else if (this.inLink && /^<\/a>/i.test(cap[0])) {
          this.inLink = false;
        }
        if (!this.inRawBlock && /^<(pre|code|kbd|script)(\s|>)/i.test(cap[0])) {
          this.inRawBlock = true;
        } else if (this.inRawBlock && /^<\/(pre|code|kbd|script)(\s|>)/i.test(cap[0])) {
          this.inRawBlock = false;
        }
        src = src.substring(cap[0].length);
        out += this.options.sanitize ? this.options.sanitizer ? this.options.sanitizer(cap[0]) : escape(cap[0]) : cap[0];
        continue;
      }
      if (cap = this.rules.link.exec(src)) {
        var lastParenIndex = findClosingBracket(cap[2], "()");
        if (lastParenIndex > -1) {
          var linkLen = 4 + cap[1].length + lastParenIndex;
          cap[2] = cap[2].substring(0, lastParenIndex);
          cap[0] = cap[0].substring(0, linkLen).trim();
          cap[3] = "";
        }
        src = src.substring(cap[0].length);
        this.inLink = true;
        href = cap[2];
        if (this.options.pedantic) {
          link = /^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(href);
          if (link) {
            href = link[1];
            title = link[3];
          } else {
            title = "";
          }
        } else {
          title = cap[3] ? cap[3].slice(1, -1) : "";
        }
        href = href.trim().replace(/^<([\s\S]*)>$/, "$1");
        out += this.outputLink(cap, {
          href: InlineLexer.escapes(href),
          title: InlineLexer.escapes(title)
        });
        this.inLink = false;
        continue;
      }
      if ((cap = this.rules.reflink.exec(src)) || (cap = this.rules.nolink.exec(src))) {
        src = src.substring(cap[0].length);
        link = (cap[2] || cap[1]).replace(/\s+/g, " ");
        link = this.links[link.toLowerCase()];
        if (!link || !link.href) {
          out += cap[0].charAt(0);
          src = cap[0].substring(1) + src;
          continue;
        }
        this.inLink = true;
        out += this.outputLink(cap, link);
        this.inLink = false;
        continue;
      }
      if (cap = this.rules.strong.exec(src)) {
        src = src.substring(cap[0].length);
        out += this.renderer.strong(
          this.output(cap[4] || cap[3] || cap[2] || cap[1])
        );
        continue;
      }
      if (cap = this.rules.em.exec(src)) {
        src = src.substring(cap[0].length);
        out += this.renderer.em(
          this.output(cap[6] || cap[5] || cap[4] || cap[3] || cap[2] || cap[1])
        );
        continue;
      }
      if (cap = this.rules.code.exec(src)) {
        src = src.substring(cap[0].length);
        out += this.renderer.codespan(escape(cap[2].trim(), true));
        continue;
      }
      if (cap = this.rules.br.exec(src)) {
        src = src.substring(cap[0].length);
        out += this.renderer.br();
        continue;
      }
      if (cap = this.rules.del.exec(src)) {
        src = src.substring(cap[0].length);
        out += this.renderer.del(this.output(cap[1]));
        continue;
      }
      if (cap = this.rules.autolink.exec(src)) {
        src = src.substring(cap[0].length);
        if (cap[2] === "@") {
          text = escape(this.mangle(cap[1]));
          href = "mailto:" + text;
        } else {
          text = escape(cap[1]);
          href = text;
        }
        out += this.renderer.link(href, null, text);
        continue;
      }
      if (!this.inLink && (cap = this.rules.url.exec(src))) {
        if (cap[2] === "@") {
          text = escape(cap[0]);
          href = "mailto:" + text;
        } else {
          do {
            prevCapZero = cap[0];
            cap[0] = this.rules._backpedal.exec(cap[0])[0];
          } while (prevCapZero !== cap[0]);
          text = escape(cap[0]);
          if (cap[1] === "www.") {
            href = "http://" + text;
          } else {
            href = text;
          }
        }
        src = src.substring(cap[0].length);
        out += this.renderer.link(href, null, text);
        continue;
      }
      if (cap = this.rules.text.exec(src)) {
        src = src.substring(cap[0].length);
        if (this.inRawBlock) {
          out += this.renderer.text(
            this.options.sanitize ? this.options.sanitizer ? this.options.sanitizer(cap[0]) : escape(cap[0]) : cap[0]
          );
        } else {
          out += this.renderer.text(escape(this.smartypants(cap[0])));
        }
        continue;
      }
      if (src) {
        throw new Error("Infinite loop on byte: " + src.charCodeAt(0));
      }
    }
    return out;
  };
  InlineLexer.escapes = function(text) {
    return text ? text.replace(InlineLexer.rules._escapes, "$1") : text;
  };
  InlineLexer.prototype.outputLink = function(cap, link) {
    var href = link.href, title = link.title ? escape(link.title) : null;
    return cap[0].charAt(0) !== "!" ? this.renderer.link(href, title, this.output(cap[1])) : this.renderer.image(href, title, escape(cap[1]));
  };
  InlineLexer.prototype.smartypants = function(text) {
    if (!this.options.smartypants)
      return text;
    return text.replace(/---/g, "\u2014").replace(/--/g, "\u2013").replace(/(^|[-\u2014/(\[{"\s])'/g, "$1\u2018").replace(/'/g, "\u2019").replace(/(^|[-\u2014/(\[{\u2018\s])"/g, "$1\u201C").replace(/"/g, "\u201D").replace(/\.{3}/g, "\u2026");
  };
  InlineLexer.prototype.mangle = function(text) {
    if (!this.options.mangle)
      return text;
    var out = "", l = text.length, i = 0, ch;
    for (; i < l; i++) {
      ch = text.charCodeAt(i);
      if (Math.random() > 0.5) {
        ch = "x" + ch.toString(16);
      }
      out += "&#" + ch + ";";
    }
    return out;
  };
  function Renderer(options) {
    this.options = options || marked2.defaults;
  }
  Renderer.prototype.code = function(code, infostring, escaped) {
    var lang = (infostring || "").match(/\S*/)[0];
    if (this.options.highlight) {
      var out = this.options.highlight(code, lang);
      if (out != null && out !== code) {
        escaped = true;
        code = out;
      }
    }
    if (!lang) {
      return "<pre><code>" + (escaped ? code : escape(code, true)) + "</code></pre>";
    }
    return '<pre><code class="' + marked2.options.langClass + " " + this.options.langPrefix + escape(lang, true) + '">' + (escaped ? code : escape(code, true)) + "</code></pre>\n";
  };
  Renderer.prototype.blockquote = function(quote) {
    return "<blockquote>\n" + quote + "</blockquote>\n";
  };
  Renderer.prototype.html = function(html) {
    return html;
  };
  Renderer.prototype.heading = function(text, level, raw, slugger) {
    if (this.options.headerIds) {
      return "<h" + level + ' id="' + this.options.headerPrefix + slugger.slug(raw) + '">' + text + "</h" + level + ">\n";
    }
    return "<h" + level + ">" + text + "</h" + level + ">\n";
  };
  Renderer.prototype.hr = function() {
    return this.options.xhtml ? "<hr/>\n" : "<hr>\n";
  };
  Renderer.prototype.list = function(body, ordered, start) {
    var type = ordered ? "ol" : "ul", startatt = ordered && start !== 1 ? ' start="' + start + '"' : "";
    return "<" + type + startatt + ">\n" + body + "</" + type + ">\n";
  };
  Renderer.prototype.listitem = function(text) {
    return "<li>" + text + "</li>\n";
  };
  Renderer.prototype.checkbox = function(checked) {
    return "<input " + (checked ? 'checked="" ' : "") + 'disabled="" type="checkbox"' + (this.options.xhtml ? " /" : "") + "> ";
  };
  Renderer.prototype.paragraph = function(text) {
    return "<p>" + text + "</p>\n";
  };
  Renderer.prototype.table = function(header, body) {
    if (body)
      body = "<tbody>" + body + "</tbody>";
    return "<table>\n<thead>\n" + header + "</thead>\n" + body + "</table>\n";
  };
  Renderer.prototype.tablerow = function(content) {
    return "<tr>\n" + content + "</tr>\n";
  };
  Renderer.prototype.tablecell = function(content, flags) {
    var type = flags.header ? "th" : "td";
    var tag = flags.align ? "<" + type + ' align="' + flags.align + '">' : "<" + type + ">";
    return tag + content + "</" + type + ">\n";
  };
  Renderer.prototype.strong = function(text) {
    return "<strong>" + text + "</strong>";
  };
  Renderer.prototype.em = function(text) {
    return "<em>" + text + "</em>";
  };
  Renderer.prototype.codespan = function(text) {
    return "<code>" + text + "</code>";
  };
  Renderer.prototype.br = function() {
    return this.options.xhtml ? "<br/>" : "<br>";
  };
  Renderer.prototype.del = function(text) {
    return "<del>" + text + "</del>";
  };
  Renderer.prototype.link = function(href, title, text) {
    href = cleanUrl(this.options.sanitize, this.options.baseUrl, href);
    if (href === null) {
      return text;
    }
    var regEx = new RegExp("^@@/static", "g");
    if (regEx.test(href)) {
      href = href.substring(3);
    } else {
      href = escape(href);
    }
    var out = `<a class='link' href="` + href + '"';
    if (title) {
      out += ' title="' + title + '"';
    }
    out += " target='_blank'>" + text + "</a>";
    return out;
  };
  Renderer.prototype.image = function(href, title, text) {
    href = cleanUrl(this.options.sanitize, this.options.baseUrl, href);
    if (href === null) {
      return text;
    }
    var out = '<img src="' + href + '" alt="' + text + '"';
    if (title) {
      out += ' title="' + title + '"';
    }
    out += this.options.xhtml ? "/>" : ">";
    return out;
  };
  Renderer.prototype.text = function(text) {
    return text;
  };
  function TextRenderer() {
  }
  TextRenderer.prototype.strong = TextRenderer.prototype.em = TextRenderer.prototype.codespan = TextRenderer.prototype.del = TextRenderer.prototype.text = function(text) {
    return text;
  };
  TextRenderer.prototype.link = TextRenderer.prototype.image = function(href, title, text) {
    return "" + text;
  };
  TextRenderer.prototype.br = function() {
    return "";
  };
  function Parser(options) {
    this.tokens = [];
    this.token = null;
    this.options = options || marked2.defaults;
    this.options.renderer = this.options.renderer || new Renderer();
    this.renderer = this.options.renderer;
    this.renderer.options = this.options;
    this.slugger = new Slugger();
  }
  Parser.parse = function(src, options) {
    var parser = new Parser(options);
    return parser.parse(src);
  };
  Parser.prototype.parse = function(src) {
    this.inline = new InlineLexer(src.links, this.options);
    this.inlineText = new InlineLexer(
      src.links,
      merge({}, this.options, {
        renderer: new TextRenderer()
      })
    );
    this.tokens = src.reverse();
    var out = "";
    while (this.next()) {
      out += this.tok();
    }
    return out;
  };
  Parser.prototype.next = function() {
    this.token = this.tokens.pop();
    return this.token;
  };
  Parser.prototype.peek = function() {
    return this.tokens[this.tokens.length - 1] || 0;
  };
  Parser.prototype.parseText = function() {
    var body = this.token.text;
    while (this.peek().type === "text") {
      body += "\n" + this.next().text;
    }
    return this.inline.output(body);
  };
  Parser.prototype.tok = function() {
    switch (this.token.type) {
      case "space": {
        return "";
      }
      case "hr": {
        return this.renderer.hr();
      }
      case "heading": {
        return this.renderer.heading(
          this.inline.output(this.token.text),
          this.token.depth,
          unescape(this.inlineText.output(this.token.text)),
          this.slugger
        );
      }
      case "code": {
        return this.renderer.code(
          this.token.text,
          this.token.lang,
          this.token.escaped
        );
      }
      case "table": {
        var header = "", body = "", i, row, cell, j;
        cell = "";
        for (i = 0; i < this.token.header.length; i++) {
          cell += this.renderer.tablecell(
            this.inline.output(this.token.header[i]),
            {
              header: true,
              align: this.token.align[i]
            }
          );
        }
        header += this.renderer.tablerow(cell);
        for (i = 0; i < this.token.cells.length; i++) {
          row = this.token.cells[i];
          cell = "";
          for (j = 0; j < row.length; j++) {
            cell += this.renderer.tablecell(this.inline.output(row[j]), {
              header: false,
              align: this.token.align[j]
            });
          }
          body += this.renderer.tablerow(cell);
        }
        return this.renderer.table(header, body);
      }
      case "blockquote_start": {
        body = "";
        while (this.next().type !== "blockquote_end") {
          body += this.tok();
        }
        return this.renderer.blockquote(body);
      }
      case "list_start": {
        body = "";
        var ordered = this.token.ordered, start = this.token.start;
        while (this.next().type !== "list_end") {
          body += this.tok();
        }
        return this.renderer.list(body, ordered, start);
      }
      case "list_item_start": {
        body = "";
        var loose = this.token.loose;
        var checked = this.token.checked;
        var task = this.token.task;
        if (this.token.task) {
          if (loose) {
            if (this.peek().type === "text") {
              var nextToken = this.peek();
              nextToken.text = this.renderer.checkbox(checked) + " " + nextToken.text;
            } else {
              this.tokens.push({
                type: "text",
                text: this.renderer.checkbox(checked)
              });
            }
          } else {
            body += this.renderer.checkbox(checked);
          }
        }
        while (this.next().type !== "list_item_end") {
          body += !loose && this.token.type === "text" ? this.parseText() : this.tok();
        }
        return this.renderer.listitem(body, task, checked);
      }
      case "html": {
        return this.renderer.html(this.token.text);
      }
      case "paragraph": {
        return this.renderer.paragraph(this.inline.output(this.token.text));
      }
      case "text": {
        return this.renderer.paragraph(this.parseText());
      }
      default: {
        var errMsg = 'Token with "' + this.token.type + '" type was not found.';
        if (this.options.silent) {
          console.log(errMsg);
        } else {
          throw new Error(errMsg);
        }
      }
    }
  };
  function Slugger() {
    this.seen = {};
  }
  Slugger.prototype.slug = function(value) {
    var slug = value.toLowerCase().trim().replace(
      /[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g,
      ""
    ).replace(/\s/g, "-");
    if (this.seen.hasOwnProperty(slug)) {
      var originalSlug = slug;
      do {
        this.seen[originalSlug]++;
        slug = originalSlug + "-" + this.seen[originalSlug];
      } while (this.seen.hasOwnProperty(slug));
    }
    this.seen[slug] = 0;
    return slug;
  };
  function escape(html, encode) {
    if (encode) {
      if (escape.escapeTest.test(html)) {
        return html.replace(escape.escapeReplace, function(ch) {
          return escape.replacements[ch];
        });
      }
    } else {
      if (escape.escapeTestNoEncode.test(html)) {
        return html.replace(escape.escapeReplaceNoEncode, function(ch) {
          return escape.replacements[ch];
        });
      }
    }
    return html;
  }
  escape.escapeTest = /[&<>"']/;
  escape.escapeReplace = /[&<>"']/g;
  escape.replacements = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  };
  escape.escapeTestNoEncode = /[<>"']|&(?!#?\w+;)/;
  escape.escapeReplaceNoEncode = /[<>"']|&(?!#?\w+;)/g;
  function unescape(html) {
    return html.replace(
      /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/gi,
      function(_, n) {
        n = n.toLowerCase();
        if (n === "colon")
          return ":";
        if (n.charAt(0) === "#") {
          return n.charAt(1) === "x" ? String.fromCharCode(parseInt(n.substring(2), 16)) : String.fromCharCode(+n.substring(1));
        }
        return "";
      }
    );
  }
  function edit(regex, opt) {
    regex = regex.source || regex;
    opt = opt || "";
    return {
      replace: function(name, val) {
        val = val.source || val;
        val = val.replace(/(^|[^\[])\^/g, "$1");
        regex = regex.replace(name, val);
        return this;
      },
      getRegex: function() {
        return new RegExp(regex, opt);
      }
    };
  }
  function cleanUrl(sanitize, base, href) {
    if (sanitize) {
      try {
        var prot = decodeURIComponent(unescape(href)).replace(/[^\w:]/g, "").toLowerCase();
      } catch (e) {
        return null;
      }
      if (prot.indexOf("javascript:") === 0 || prot.indexOf("vbscript:") === 0 || prot.indexOf("data:") === 0) {
        return null;
      }
    }
    if (base && !originIndependentUrl.test(href)) {
      href = resolveUrl(base, href);
    }
    try {
      href = encodeURI(href).replace(/%25/g, "%");
    } catch (e) {
      return null;
    }
    return href;
  }
  function resolveUrl(base, href) {
    if (!baseUrls[" " + base]) {
      if (/^[^:]+:\/*[^/]*$/.test(base)) {
        baseUrls[" " + base] = base + "/";
      } else {
        baseUrls[" " + base] = rtrim(base, "/", true);
      }
    }
    base = baseUrls[" " + base];
    var relativeBase = base.indexOf(":") === -1;
    if (href.slice(0, 2) === "//") {
      if (relativeBase) {
        return href;
      }
      return base.replace(/^([^:]+:)[\s\S]*$/, "$1") + href;
    } else if (href.charAt(0) === "/") {
      if (relativeBase) {
        return href;
      }
      return base.replace(/^([^:]+:\/*[^/]*)[\s\S]*$/, "$1") + href;
    } else {
      return base + href;
    }
  }
  var baseUrls = {};
  var originIndependentUrl = /^$|^[a-z][a-z0-9+.-]*:|^[?#]/i;
  function noop() {
  }
  noop.exec = noop;
  function merge(obj) {
    var i = 1, target, key;
    for (; i < arguments.length; i++) {
      target = arguments[i];
      for (key in target) {
        if (Object.prototype.hasOwnProperty.call(target, key)) {
          obj[key] = target[key];
        }
      }
    }
    return obj;
  }
  function splitCells(tableRow, count) {
    var row = tableRow.replace(/\|/g, function(match, offset, str) {
      var escaped = false, curr = offset;
      while (--curr >= 0 && str[curr] === "\\")
        escaped = !escaped;
      if (escaped) {
        return "|";
      } else {
        return " |";
      }
    }), cells = row.split(/ \|/), i = 0;
    if (cells.length > count) {
      cells.splice(count);
    } else {
      while (cells.length < count)
        cells.push("");
    }
    for (; i < cells.length; i++) {
      cells[i] = cells[i].trim().replace(/\\\|/g, "|");
    }
    return cells;
  }
  function rtrim(str, c, invert) {
    if (str.length === 0) {
      return "";
    }
    var suffLen = 0;
    while (suffLen < str.length) {
      var currChar = str.charAt(str.length - suffLen - 1);
      if (currChar === c && !invert) {
        suffLen++;
      } else if (currChar !== c && invert) {
        suffLen++;
      } else {
        break;
      }
    }
    return str.substr(0, str.length - suffLen);
  }
  function findClosingBracket(str, b) {
    if (str.indexOf(b[1]) === -1) {
      return -1;
    }
    var level = 0;
    for (var i = 0; i < str.length; i++) {
      if (str[i] === "\\") {
        i++;
      } else if (str[i] === b[0]) {
        level++;
      } else if (str[i] === b[1]) {
        level--;
        if (level < 0) {
          return i;
        }
      }
    }
    return -1;
  }
  function checkSanitizeDeprecation(opt) {
    if (opt && opt.sanitize && !opt.silent) {
      console.warn(
        "marked(): sanitize and sanitizer parameters are deprecated since version 0.7.0, should not be used and will be removed in the future. Read more here: https://marked.js.org/#/USING_ADVANCED.md#options"
      );
    }
  }
  function marked2(src, opt, callback) {
    if (typeof src === "undefined" || src === null) {
      throw new Error("marked(): input parameter is undefined or null");
    }
    if (typeof src !== "string") {
      throw new Error(
        "marked(): input parameter is of type " + Object.prototype.toString.call(src) + ", string expected"
      );
    }
    if (callback || typeof opt === "function") {
      if (!callback) {
        callback = opt;
        opt = null;
      }
      opt = merge({}, marked2.defaults, opt || {});
      checkSanitizeDeprecation(opt);
      var highlight = opt.highlight, tokens, pending, i = 0;
      try {
        tokens = Lexer.lex(src, opt);
      } catch (e) {
        return callback(e);
      }
      pending = tokens.length;
      var done = function(err) {
        if (err) {
          opt.highlight = highlight;
          return callback(err);
        }
        var out;
        try {
          out = Parser.parse(tokens, opt);
        } catch (e) {
          err = e;
        }
        opt.highlight = highlight;
        return err ? callback(err) : callback(null, out);
      };
      if (!highlight || highlight.length < 3) {
        return done();
      }
      delete opt.highlight;
      if (!pending)
        return done();
      for (; i < tokens.length; i++) {
        (function(token) {
          if (token.type !== "code") {
            return --pending || done();
          }
          return highlight(token.text, token.lang, function(err, code) {
            if (err)
              return done(err);
            if (code == null || code === token.text) {
              return --pending || done();
            }
            token.text = code;
            token.escaped = true;
            --pending || done();
          });
        })(tokens[i]);
      }
      return;
    }
    try {
      if (opt)
        opt = merge({}, marked2.defaults, opt);
      checkSanitizeDeprecation(opt);
      return Parser.parse(Lexer.lex(src, opt), opt);
    } catch (e) {
      e.message += "\nPlease report this to https://github.com/markedjs/marked.";
      if ((opt || marked2.defaults).silent) {
        return "<p>An error occurred:</p><pre>" + escape(e.message + "", true) + "</pre>";
      }
      throw e;
    }
  }
  marked2.options = marked2.setOptions = function(opt) {
    merge(marked2.defaults, opt);
    return marked2;
  };
  marked2.getDefaults = function() {
    return {
      baseUrl: null,
      breaks: false,
      gfm: true,
      headerIds: true,
      headerPrefix: "",
      highlight: null,
      langPrefix: "language-",
      mangle: true,
      pedantic: false,
      renderer: new Renderer(),
      sanitize: false,
      sanitizer: null,
      silent: false,
      smartLists: false,
      smartypants: false,
      xhtml: false
    };
  };
  marked2.defaults = marked2.getDefaults();
  marked2.Parser = Parser;
  marked2.parser = Parser.parse;
  marked2.Renderer = Renderer;
  marked2.TextRenderer = TextRenderer;
  marked2.Lexer = Lexer;
  marked2.lexer = Lexer.lex;
  marked2.InlineLexer = InlineLexer;
  marked2.inlineLexer = InlineLexer.output;
  marked2.Slugger = Slugger;
  marked2.parse = marked2;
  if (typeof module !== "undefined" && typeof exports === "object") {
    module.exports = marked2;
  } else if (typeof define === "function" && define.amd) {
    define(function() {
      return marked2;
    });
  } else {
    root.marked = marked2;
  }
  return marked2;
}(typeof window !== "undefined" ? window : global);
var hljs = function() {
  function e(t2) {
    return t2 instanceof Map ? t2.clear = t2.delete = t2.set = () => {
      throw Error("map is read-only");
    } : t2 instanceof Set && (t2.add = t2.clear = t2.delete = () => {
      throw Error("set is read-only");
    }), Object.freeze(t2), Object.getOwnPropertyNames(t2).forEach((n2) => {
      var s2 = t2[n2];
      "object" != typeof s2 || Object.isFrozen(s2) || e(s2);
    }), t2;
  }
  var t = e, n = e;
  t.default = n;
  class s {
    constructor(e2) {
      void 0 === e2.data && (e2.data = {}), this.data = e2.data;
    }
    ignoreMatch() {
      this.ignore = true;
    }
  }
  function r(e2) {
    return e2.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;");
  }
  function a(e2, ...t2) {
    const n2 = /* @__PURE__ */ Object.create(null);
    for (const t3 in e2)
      n2[t3] = e2[t3];
    return t2.forEach((e3) => {
      for (const t3 in e3)
        n2[t3] = e3[t3];
    }), n2;
  }
  function i(e2) {
    return e2.nodeName.toLowerCase();
  }
  var o = Object.freeze({
    __proto__: null,
    escapeHTML: r,
    inherit: a,
    nodeStream: (e2) => {
      const t2 = [];
      return function e3(n2, s2) {
        for (let r2 = n2.firstChild; r2; r2 = r2.nextSibling)
          3 === r2.nodeType ? s2 += r2.nodeValue.length : 1 === r2.nodeType && (t2.push({
            event: "start",
            offset: s2,
            node: r2
          }), s2 = e3(r2, s2), i(r2).match(/br|hr|img|input/) || t2.push({
            event: "stop",
            offset: s2,
            node: r2
          }));
        return s2;
      }(e2, 0), t2;
    },
    mergeStreams: (e2, t2, n2) => {
      let s2 = 0, a2 = "";
      const o2 = [];
      function l2() {
        return e2.length && t2.length ? e2[0].offset !== t2[0].offset ? e2[0].offset < t2[0].offset ? e2 : t2 : "start" === t2[0].event ? e2 : t2 : e2.length ? e2 : t2;
      }
      function c2(e3) {
        a2 += "<" + i(e3) + [].map.call(e3.attributes, (e4) => " " + e4.nodeName + '="' + r(e4.value) + '"').join("") + ">";
      }
      function u2(e3) {
        a2 += "</" + i(e3) + ">";
      }
      function g2(e3) {
        ("start" === e3.event ? c2 : u2)(e3.node);
      }
      for (; e2.length || t2.length; ) {
        let t3 = l2();
        if (a2 += r(n2.substring(s2, t3[0].offset)), s2 = t3[0].offset, t3 === e2) {
          o2.reverse().forEach(u2);
          do {
            g2(t3.splice(0, 1)[0]), t3 = l2();
          } while (t3 === e2 && t3.length && t3[0].offset === s2);
          o2.reverse().forEach(c2);
        } else
          "start" === t3[0].event ? o2.push(t3[0].node) : o2.pop(), g2(t3.splice(0, 1)[0]);
      }
      return a2 + r(n2.substr(s2));
    }
  });
  const l = (e2) => !!e2.kind;
  class c {
    constructor(e2, t2) {
      this.buffer = "", this.classPrefix = t2.classPrefix, e2.walk(this);
    }
    addText(e2) {
      this.buffer += r(e2);
    }
    openNode(e2) {
      if (!l(e2))
        return;
      let t2 = e2.kind;
      e2.sublanguage || (t2 = `${this.classPrefix}${t2}`), this.span(t2);
    }
    closeNode(e2) {
      l(e2) && (this.buffer += "</span>");
    }
    value() {
      return this.buffer;
    }
    span(e2) {
      this.buffer += `<span class="${e2}">`;
    }
  }
  class u {
    constructor() {
      this.rootNode = {
        children: []
      }, this.stack = [this.rootNode];
    }
    get top() {
      return this.stack[this.stack.length - 1];
    }
    get root() {
      return this.rootNode;
    }
    add(e2) {
      this.top.children.push(e2);
    }
    openNode(e2) {
      const t2 = { kind: e2, children: [] };
      this.add(t2), this.stack.push(t2);
    }
    closeNode() {
      if (this.stack.length > 1)
        return this.stack.pop();
    }
    closeAllNodes() {
      for (; this.closeNode(); )
        ;
    }
    toJSON() {
      return JSON.stringify(this.rootNode, null, 4);
    }
    walk(e2) {
      return this.constructor._walk(e2, this.rootNode);
    }
    static _walk(e2, t2) {
      return "string" == typeof t2 ? e2.addText(t2) : t2.children && (e2.openNode(t2), t2.children.forEach((t3) => this._walk(e2, t3)), e2.closeNode(t2)), e2;
    }
    static _collapse(e2) {
      "string" != typeof e2 && e2.children && (e2.children.every((e3) => "string" == typeof e3) ? e2.children = [e2.children.join("")] : e2.children.forEach((e3) => {
        u._collapse(e3);
      }));
    }
  }
  class g extends u {
    constructor(e2) {
      super(), this.options = e2;
    }
    addKeyword(e2, t2) {
      "" !== e2 && (this.openNode(t2), this.addText(e2), this.closeNode());
    }
    addText(e2) {
      "" !== e2 && this.add(e2);
    }
    addSublanguage(e2, t2) {
      const n2 = e2.root;
      n2.kind = t2, n2.sublanguage = true, this.add(n2);
    }
    toHTML() {
      return new c(this, this.options).value();
    }
    finalize() {
      return true;
    }
  }
  function d(e2) {
    return e2 ? "string" == typeof e2 ? e2 : e2.source : null;
  }
  const h = "[a-zA-Z]\\w*", f = "[a-zA-Z_]\\w*", p = "\\b\\d+(\\.\\d+)?", m = "(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)", b = "\\b(0b[01]+)", x = {
    begin: "\\\\[\\s\\S]",
    relevance: 0
  }, E = {
    className: "string",
    begin: "'",
    end: "'",
    illegal: "\\n",
    contains: [x]
  }, v = {
    className: "string",
    begin: '"',
    end: '"',
    illegal: "\\n",
    contains: [x]
  }, _ = {
    begin: /\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/
  }, w = (e2, t2, n2 = {}) => {
    const s2 = a({ className: "comment", begin: e2, end: t2, contains: [] }, n2);
    return s2.contains.push(_), s2.contains.push({
      className: "doctag",
      begin: "(?:TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):",
      relevance: 0
    }), s2;
  }, N = w("//", "$"), y = w("/\\*", "\\*/"), R = w("#", "$");
  var k = Object.freeze({
    __proto__: null,
    IDENT_RE: h,
    UNDERSCORE_IDENT_RE: f,
    NUMBER_RE: p,
    C_NUMBER_RE: m,
    BINARY_NUMBER_RE: b,
    RE_STARTERS_RE: "!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",
    SHEBANG: (e2 = {}) => {
      const t2 = /^#![ ]*\//;
      return e2.binary && (e2.begin = ((...e3) => e3.map((e4) => d(e4)).join(""))(
        t2,
        /.*\b/,
        e2.binary,
        /\b.*/
      )), a(
        {
          className: "meta",
          begin: t2,
          end: /$/,
          relevance: 0,
          "on:begin": (e3, t3) => {
            0 !== e3.index && t3.ignoreMatch();
          }
        },
        e2
      );
    },
    BACKSLASH_ESCAPE: x,
    APOS_STRING_MODE: E,
    QUOTE_STRING_MODE: v,
    PHRASAL_WORDS_MODE: _,
    COMMENT: w,
    C_LINE_COMMENT_MODE: N,
    C_BLOCK_COMMENT_MODE: y,
    HASH_COMMENT_MODE: R,
    NUMBER_MODE: { className: "number", begin: p, relevance: 0 },
    C_NUMBER_MODE: { className: "number", begin: m, relevance: 0 },
    BINARY_NUMBER_MODE: { className: "number", begin: b, relevance: 0 },
    CSS_NUMBER_MODE: {
      className: "number",
      begin: p + "(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?",
      relevance: 0
    },
    REGEXP_MODE: {
      begin: /(?=\/[^/\n]*\/)/,
      contains: [
        {
          className: "regexp",
          begin: /\//,
          end: /\/[gimuy]*/,
          illegal: /\n/,
          contains: [x, { begin: /\[/, end: /\]/, relevance: 0, contains: [x] }]
        }
      ]
    },
    TITLE_MODE: { className: "title", begin: h, relevance: 0 },
    UNDERSCORE_TITLE_MODE: { className: "title", begin: f, relevance: 0 },
    METHOD_GUARD: {
      begin: "\\.\\s*[a-zA-Z_]\\w*",
      relevance: 0
    },
    END_SAME_AS_BEGIN: (e2) => Object.assign(e2, {
      "on:begin": (e3, t2) => {
        t2.data._beginMatch = e3[1];
      },
      "on:end": (e3, t2) => {
        t2.data._beginMatch !== e3[1] && t2.ignoreMatch();
      }
    })
  });
  const M = [
    "of",
    "and",
    "for",
    "in",
    "not",
    "or",
    "if",
    "then",
    "parent",
    "list",
    "value"
  ];
  function O(e2) {
    function t2(t3, n3) {
      return RegExp(
        d(t3),
        "m" + (e2.case_insensitive ? "i" : "") + (n3 ? "g" : "")
      );
    }
    class n2 {
      constructor() {
        this.matchIndexes = {}, this.regexes = [], this.matchAt = 1, this.position = 0;
      }
      addRule(e3, t3) {
        t3.position = this.position++, this.matchIndexes[this.matchAt] = t3, this.regexes.push([t3, e3]), this.matchAt += ((e4) => RegExp(e4.toString() + "|").exec("").length - 1)(e3) + 1;
      }
      compile() {
        0 === this.regexes.length && (this.exec = () => null);
        const e3 = this.regexes.map((e4) => e4[1]);
        this.matcherRe = t2(
          ((e4, t3 = "|") => {
            const n3 = /\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;
            let s3 = 0, r3 = "";
            for (let a2 = 0; a2 < e4.length; a2++) {
              s3 += 1;
              const i2 = s3;
              let o2 = d(e4[a2]);
              for (a2 > 0 && (r3 += t3), r3 += "("; o2.length > 0; ) {
                const e5 = n3.exec(o2);
                if (null == e5) {
                  r3 += o2;
                  break;
                }
                r3 += o2.substring(0, e5.index), o2 = o2.substring(e5.index + e5[0].length), "\\" === e5[0][0] && e5[1] ? r3 += "\\" + (Number(e5[1]) + i2) : (r3 += e5[0], "(" === e5[0] && s3++);
              }
              r3 += ")";
            }
            return r3;
          })(e3),
          true
        ), this.lastIndex = 0;
      }
      exec(e3) {
        this.matcherRe.lastIndex = this.lastIndex;
        const t3 = this.matcherRe.exec(e3);
        if (!t3)
          return null;
        const n3 = t3.findIndex((e4, t4) => t4 > 0 && void 0 !== e4), s3 = this.matchIndexes[n3];
        return t3.splice(0, n3), Object.assign(t3, s3);
      }
    }
    class s2 {
      constructor() {
        this.rules = [], this.multiRegexes = [], this.count = 0, this.lastIndex = 0, this.regexIndex = 0;
      }
      getMatcher(e3) {
        if (this.multiRegexes[e3])
          return this.multiRegexes[e3];
        const t3 = new n2();
        return this.rules.slice(e3).forEach(([e4, n3]) => t3.addRule(e4, n3)), t3.compile(), this.multiRegexes[e3] = t3, t3;
      }
      resumingScanAtSamePosition() {
        return 0 !== this.regexIndex;
      }
      considerAll() {
        this.regexIndex = 0;
      }
      addRule(e3, t3) {
        this.rules.push([e3, t3]), "begin" === t3.type && this.count++;
      }
      exec(e3) {
        const t3 = this.getMatcher(this.regexIndex);
        t3.lastIndex = this.lastIndex;
        let n3 = t3.exec(e3);
        if (this.resumingScanAtSamePosition())
          if (n3 && n3.index === this.lastIndex)
            ;
          else {
            const t4 = this.getMatcher(0);
            t4.lastIndex = this.lastIndex + 1, n3 = t4.exec(e3);
          }
        return n3 && (this.regexIndex += n3.position + 1, this.regexIndex === this.count && this.considerAll()), n3;
      }
    }
    function r2(e3, t3) {
      "." === e3.input[e3.index - 1] && t3.ignoreMatch();
    }
    if (e2.contains && e2.contains.includes("self"))
      throw Error(
        "ERR: contains `self` is not supported at the top-level of a language.  See documentation."
      );
    return e2.classNameAliases = a(e2.classNameAliases || {}), function n3(i2, o2) {
      const l2 = i2;
      if (i2.compiled)
        return l2;
      i2.compiled = true, i2.__beforeBegin = null, i2.keywords = i2.keywords || i2.beginKeywords;
      let c2 = null;
      if ("object" == typeof i2.keywords && (c2 = i2.keywords.$pattern, delete i2.keywords.$pattern), i2.keywords && (i2.keywords = ((e3, t3) => {
        const n4 = {};
        return "string" == typeof e3 ? s3("keyword", e3) : Object.keys(e3).forEach((t4) => {
          s3(t4, e3[t4]);
        }), n4;
        function s3(e4, s4) {
          t3 && (s4 = s4.toLowerCase()), s4.split(" ").forEach((t4) => {
            const s5 = t4.split("|");
            n4[s5[0]] = [e4, A(s5[0], s5[1])];
          });
        }
      })(i2.keywords, e2.case_insensitive)), i2.lexemes && c2)
        throw Error(
          "ERR: Prefer `keywords.$pattern` to `mode.lexemes`, BOTH are not allowed. (see mode reference) "
        );
      return l2.keywordPatternRe = t2(i2.lexemes || c2 || /\w+/, true), o2 && (i2.beginKeywords && (i2.begin = "\\b(" + i2.beginKeywords.split(" ").join("|") + ")(?!\\.)(?=\\b|\\s)", i2.__beforeBegin = r2), i2.begin || (i2.begin = /\B|\b/), l2.beginRe = t2(i2.begin), i2.endSameAsBegin && (i2.end = i2.begin), i2.end || i2.endsWithParent || (i2.end = /\B|\b/), i2.end && (l2.endRe = t2(i2.end)), l2.terminator_end = d(i2.end) || "", i2.endsWithParent && o2.terminator_end && (l2.terminator_end += (i2.end ? "|" : "") + o2.terminator_end)), i2.illegal && (l2.illegalRe = t2(i2.illegal)), void 0 === i2.relevance && (i2.relevance = 1), i2.contains || (i2.contains = []), i2.contains = [].concat(
        ...i2.contains.map(
          (e3) => ((e4) => (e4.variants && !e4.cached_variants && (e4.cached_variants = e4.variants.map(
            (t3) => a(
              e4,
              {
                variants: null
              },
              t3
            )
          )), e4.cached_variants ? e4.cached_variants : L(e4) ? a(e4, {
            starts: e4.starts ? a(e4.starts) : null
          }) : Object.isFrozen(e4) ? a(e4) : e4))("self" === e3 ? i2 : e3)
        )
      ), i2.contains.forEach((e3) => {
        n3(e3, l2);
      }), i2.starts && n3(i2.starts, o2), l2.matcher = ((e3) => {
        const t3 = new s2();
        return e3.contains.forEach(
          (e4) => t3.addRule(e4.begin, { rule: e4, type: "begin" })
        ), e3.terminator_end && t3.addRule(e3.terminator_end, { type: "end" }), e3.illegal && t3.addRule(e3.illegal, { type: "illegal" }), t3;
      })(l2), l2;
    }(e2);
  }
  function L(e2) {
    return !!e2 && (e2.endsWithParent || L(e2.starts));
  }
  function A(e2, t2) {
    return t2 ? Number(t2) : ((e3) => M.includes(e3.toLowerCase()))(e2) ? 0 : 1;
  }
  function j(e2) {
    const t2 = {
      props: ["language", "code", "autodetect"],
      data: () => ({ detectedLanguage: "", unknownLanguage: false }),
      computed: {
        className() {
          return this.unknownLanguage ? "" : "hljs " + this.detectedLanguage;
        },
        highlighted() {
          if (!this.autoDetect && !e2.getLanguage(this.language))
            return console.warn(
              `The language "${this.language}" you specified could not be found.`
            ), this.unknownLanguage = true, r(this.code);
          let t3;
          return this.autoDetect ? (t3 = e2.highlightAuto(this.code), this.detectedLanguage = t3.language) : (t3 = e2.highlight(
            this.language,
            this.code,
            this.ignoreIllegals
          ), this.detectedLanguage = this.language), t3.value;
        },
        autoDetect() {
          return !(this.language && (e3 = this.autodetect, !e3 && "" !== e3));
          var e3;
        },
        ignoreIllegals: () => true
      },
      render(e3) {
        return e3("pre", {}, [
          e3("code", {
            class: this.className,
            domProps: { innerHTML: this.highlighted }
          })
        ]);
      }
    };
    return {
      Component: t2,
      VuePlugin: {
        install(e3) {
          e3.component("highlightjs", t2);
        }
      }
    };
  }
  const I = r, S = a, { nodeStream: T, mergeStreams: B } = o, P = Symbol("nomatch");
  return ((e2) => {
    const n2 = [], r2 = /* @__PURE__ */ Object.create(null), a2 = /* @__PURE__ */ Object.create(null), i2 = [];
    let o2 = true;
    const l2 = /(^(<[^>]+>|\t|)+|\n)/gm, c2 = "Could not find the language '{}', did you forget to load/include a language module?", u2 = {
      disableAutodetect: true,
      name: "Plain text",
      contains: []
    };
    let d2 = {
      noHighlightRe: /^(no-?highlight)$/i,
      languageDetectRe: /\blang(?:uage)?-([\w-]+)\b/i,
      classPrefix: "hljs-",
      tabReplace: null,
      useBR: false,
      languages: null,
      __emitter: g
    };
    function h2(e3) {
      return d2.noHighlightRe.test(e3);
    }
    function f2(e3, t2, n3, s2) {
      const r3 = { code: t2, language: e3 };
      N2("before:highlight", r3);
      const a3 = r3.result ? r3.result : p2(r3.language, r3.code, n3, s2);
      return a3.code = r3.code, N2("after:highlight", a3), a3;
    }
    function p2(e3, t2, n3, a3) {
      const i3 = t2;
      function l3(e4, t3) {
        const n4 = _3.case_insensitive ? t3[0].toLowerCase() : t3[0];
        return Object.prototype.hasOwnProperty.call(e4.keywords, n4) && e4.keywords[n4];
      }
      function u3() {
        null != y2.subLanguage ? (() => {
          if ("" === M2)
            return;
          let e4 = null;
          if ("string" == typeof y2.subLanguage) {
            if (!r2[y2.subLanguage])
              return void k2.addText(M2);
            e4 = p2(y2.subLanguage, M2, true, R2[y2.subLanguage]), R2[y2.subLanguage] = e4.top;
          } else
            e4 = m2(M2, y2.subLanguage.length ? y2.subLanguage : null);
          y2.relevance > 0 && (L2 += e4.relevance), k2.addSublanguage(e4.emitter, e4.language);
        })() : (() => {
          if (!y2.keywords)
            return void k2.addText(M2);
          let e4 = 0;
          y2.keywordPatternRe.lastIndex = 0;
          let t3 = y2.keywordPatternRe.exec(M2), n4 = "";
          for (; t3; ) {
            n4 += M2.substring(e4, t3.index);
            const s2 = l3(y2, t3);
            if (s2) {
              const [e5, r3] = s2;
              k2.addText(n4), n4 = "", L2 += r3;
              const a4 = _3.classNameAliases[e5] || e5;
              k2.addKeyword(t3[0], a4);
            } else
              n4 += t3[0];
            e4 = y2.keywordPatternRe.lastIndex, t3 = y2.keywordPatternRe.exec(M2);
          }
          n4 += M2.substr(e4), k2.addText(n4);
        })(), M2 = "";
      }
      function g2(e4) {
        return e4.className && k2.openNode(_3.classNameAliases[e4.className] || e4.className), y2 = Object.create(e4, { parent: { value: y2 } }), y2;
      }
      function h3(e4, t3, n4) {
        let r3 = ((e5, t4) => {
          const n5 = e5 && e5.exec(t4);
          return n5 && 0 === n5.index;
        })(e4.endRe, n4);
        if (r3) {
          if (e4["on:end"]) {
            const n5 = new s(e4);
            e4["on:end"](t3, n5), n5.ignore && (r3 = false);
          }
          if (r3) {
            for (; e4.endsParent && e4.parent; )
              e4 = e4.parent;
            return e4;
          }
        }
        if (e4.endsWithParent)
          return h3(e4.parent, t3, n4);
      }
      function f3(e4) {
        return 0 === y2.matcher.regexIndex ? (M2 += e4[0], 1) : (S2 = true, 0);
      }
      function b3(e4) {
        const t3 = e4[0], n4 = i3.substr(e4.index), s2 = h3(y2, e4, n4);
        if (!s2)
          return P;
        const r3 = y2;
        r3.skip ? M2 += t3 : (r3.returnEnd || r3.excludeEnd || (M2 += t3), u3(), r3.excludeEnd && (M2 = t3));
        do {
          y2.className && k2.closeNode(), y2.skip || y2.subLanguage || (L2 += y2.relevance), y2 = y2.parent;
        } while (y2 !== s2.parent);
        return s2.starts && (s2.endSameAsBegin && (s2.starts.endRe = s2.endRe), g2(s2.starts)), r3.returnEnd ? 0 : t3.length;
      }
      let x3 = {};
      function E3(t3, r3) {
        const a4 = r3 && r3[0];
        if (M2 += t3, null == a4)
          return u3(), 0;
        if ("begin" === x3.type && "end" === r3.type && x3.index === r3.index && "" === a4) {
          if (M2 += i3.slice(r3.index, r3.index + 1), !o2) {
            const t4 = Error("0 width match regex");
            throw t4.languageName = e3, t4.badRule = x3.rule, t4;
          }
          return 1;
        }
        if (x3 = r3, "begin" === r3.type)
          return function(e4) {
            const t4 = e4[0], n4 = e4.rule, r4 = new s(n4), a5 = [n4.__beforeBegin, n4["on:begin"]];
            for (const n5 of a5)
              if (n5 && (n5(e4, r4), r4.ignore))
                return f3(t4);
            return n4 && n4.endSameAsBegin && (n4.endRe = RegExp(
              t4.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&"),
              "m"
            )), n4.skip ? M2 += t4 : (n4.excludeBegin && (M2 += t4), u3(), n4.returnBegin || n4.excludeBegin || (M2 = t4)), g2(n4), n4.returnBegin ? 0 : t4.length;
          }(r3);
        if ("illegal" === r3.type && !n3) {
          const e4 = Error(
            'Illegal lexeme "' + a4 + '" for mode "' + (y2.className || "<unnamed>") + '"'
          );
          throw e4.mode = y2, e4;
        }
        if ("end" === r3.type) {
          const e4 = b3(r3);
          if (e4 !== P)
            return e4;
        }
        if ("illegal" === r3.type && "" === a4)
          return 1;
        if (j2 > 1e5 && j2 > 3 * r3.index)
          throw Error(
            "potential infinite loop, way more iterations than matches"
          );
        return M2 += a4, a4.length;
      }
      const _3 = v2(e3);
      if (!_3)
        throw console.error(c2.replace("{}", e3)), Error('Unknown language: "' + e3 + '"');
      const w3 = O(_3);
      let N3 = "", y2 = a3 || w3;
      const R2 = {}, k2 = new d2.__emitter(d2);
      (() => {
        const e4 = [];
        for (let t3 = y2; t3 !== _3; t3 = t3.parent)
          t3.className && e4.unshift(t3.className);
        e4.forEach((e5) => k2.openNode(e5));
      })();
      let M2 = "", L2 = 0, A2 = 0, j2 = 0, S2 = false;
      try {
        for (y2.matcher.considerAll(); ; ) {
          j2++, S2 ? S2 = false : y2.matcher.considerAll(), y2.matcher.lastIndex = A2;
          const e4 = y2.matcher.exec(i3);
          if (!e4)
            break;
          const t3 = E3(i3.substring(A2, e4.index), e4);
          A2 = e4.index + t3;
        }
        return E3(i3.substr(A2)), k2.closeAllNodes(), k2.finalize(), N3 = k2.toHTML(), {
          relevance: L2,
          value: N3,
          language: e3,
          illegal: false,
          emitter: k2,
          top: y2
        };
      } catch (t3) {
        if (t3.message && t3.message.includes("Illegal"))
          return {
            illegal: true,
            illegalBy: {
              msg: t3.message,
              context: i3.slice(A2 - 100, A2 + 100),
              mode: t3.mode
            },
            sofar: N3,
            relevance: 0,
            value: I(i3),
            emitter: k2
          };
        if (o2)
          return {
            illegal: false,
            relevance: 0,
            value: I(i3),
            emitter: k2,
            language: e3,
            top: y2,
            errorRaised: t3
          };
        throw t3;
      }
    }
    function m2(e3, t2) {
      t2 = t2 || d2.languages || Object.keys(r2);
      const n3 = ((e4) => {
        const t3 = {
          relevance: 0,
          emitter: new d2.__emitter(d2),
          value: I(e4),
          illegal: false,
          top: u2
        };
        return t3.emitter.addText(e4), t3;
      })(e3), s2 = t2.filter(v2).filter(w2).map((t3) => p2(t3, e3, false));
      s2.unshift(n3);
      const a3 = s2.sort((e4, t3) => {
        if (e4.relevance !== t3.relevance)
          return t3.relevance - e4.relevance;
        if (e4.language && t3.language) {
          if (v2(e4.language).supersetOf === t3.language)
            return 1;
          if (v2(t3.language).supersetOf === e4.language)
            return -1;
        }
        return 0;
      }), [i3, o3] = a3, l3 = i3;
      return l3.second_best = o3, l3;
    }
    function b2(e3) {
      return d2.tabReplace || d2.useBR ? e3.replace(
        l2,
        (e4) => "\n" === e4 ? d2.useBR ? "<br>" : e4 : d2.tabReplace ? e4.replace(/\t/g, d2.tabReplace) : e4
      ) : e3;
    }
    function x2(e3) {
      let t2 = null;
      const n3 = ((e4) => {
        let t3 = e4.className + " ";
        t3 += e4.parentNode ? e4.parentNode.className : "";
        const n4 = d2.languageDetectRe.exec(t3);
        if (n4) {
          const t4 = v2(n4[1]);
          return t4 || (console.warn(c2.replace("{}", n4[1])), console.warn(
            "Falling back to no-highlight mode for this block.",
            e4
          )), t4 ? n4[1] : "no-highlight";
        }
        return t3.split(/\s+/).find((e5) => h2(e5) || v2(e5));
      })(e3);
      if (h2(n3))
        return;
      N2("before:highlightBlock", { block: e3, language: n3 }), d2.useBR ? (t2 = document.createElement("div"), t2.innerHTML = e3.innerHTML.replace(/\n/g, "").replace(/<br[ /]*>/g, "\n")) : t2 = e3;
      const s2 = t2.textContent, r3 = n3 ? f2(n3, s2, true) : m2(s2), i3 = T(t2);
      if (i3.length) {
        const e4 = document.createElement("div");
        e4.innerHTML = r3.value, r3.value = B(i3, T(e4), s2);
      }
      r3.value = b2(r3.value), N2("after:highlightBlock", { block: e3, result: r3 }), e3.innerHTML = r3.value, e3.className = ((e4, t3, n4) => {
        const s3 = t3 ? a2[t3] : n4, r4 = [e4.trim()];
        return e4.match(/\bhljs\b/) || r4.push("hljs"), e4.includes(s3) || r4.push(s3), r4.join(" ").trim();
      })(e3.className, n3, r3.language), e3.result = {
        language: r3.language,
        re: r3.relevance,
        relavance: r3.relevance
      }, r3.second_best && (e3.second_best = {
        language: r3.second_best.language,
        re: r3.second_best.relevance,
        relavance: r3.second_best.relevance
      });
    }
    const E2 = () => {
      if (E2.called)
        return;
      E2.called = true;
      const e3 = document.querySelectorAll("pre code");
      n2.forEach.call(e3, x2);
    };
    function v2(e3) {
      return e3 = (e3 || "").toLowerCase(), r2[e3] || r2[a2[e3]];
    }
    function _2(e3, { languageName: t2 }) {
      "string" == typeof e3 && (e3 = [e3]), e3.forEach((e4) => {
        a2[e4] = t2;
      });
    }
    function w2(e3) {
      const t2 = v2(e3);
      return t2 && !t2.disableAutodetect;
    }
    function N2(e3, t2) {
      const n3 = e3;
      i2.forEach((e4) => {
        e4[n3] && e4[n3](t2);
      });
    }
    Object.assign(e2, {
      highlight: f2,
      highlightAuto: m2,
      fixMarkup: (e3) => (console.warn(
        "fixMarkup is deprecated and will be removed entirely in v11.0"
      ), console.warn(
        "Please see https://github.com/highlightjs/highlight.js/issues/2534"
      ), b2(e3)),
      highlightBlock: x2,
      configure: (e3) => {
        e3.useBR && (console.warn(
          "'useBR' option is deprecated and will be removed entirely in v11.0"
        ), console.warn(
          "Please see https://github.com/highlightjs/highlight.js/issues/2559"
        )), d2 = S(d2, e3);
      },
      initHighlighting: E2,
      initHighlightingOnLoad: () => {
        window.addEventListener("DOMContentLoaded", E2, false);
      },
      registerLanguage: (t2, n3) => {
        let s2 = null;
        try {
          s2 = n3(e2);
        } catch (e3) {
          if (console.error(
            "Language definition for '{}' could not be registered.".replace(
              "{}",
              t2
            )
          ), !o2)
            throw e3;
          console.error(e3), s2 = u2;
        }
        s2.name || (s2.name = t2), r2[t2] = s2, s2.rawDefinition = n3.bind(null, e2), s2.aliases && _2(s2.aliases, { languageName: t2 });
      },
      listLanguages: () => Object.keys(r2),
      getLanguage: v2,
      registerAliases: _2,
      requireLanguage: (e3) => {
        console.warn(
          "requireLanguage is deprecated and will be removed entirely in the future."
        ), console.warn(
          "Please see https://github.com/highlightjs/highlight.js/pull/2844"
        );
        const t2 = v2(e3);
        if (t2)
          return t2;
        throw Error(
          "The '{}' language is required, but not loaded.".replace("{}", e3)
        );
      },
      autoDetection: w2,
      inherit: S,
      addPlugin: (e3) => {
        i2.push(e3);
      },
      vuePlugin: j(e2).VuePlugin
    }), e2.debugMode = () => {
      o2 = false;
    }, e2.safeMode = () => {
      o2 = true;
    }, e2.versionString = "10.4.0";
    for (const e3 in k)
      "object" == typeof k[e3] && t(k[e3]);
    return Object.assign(e2, k), e2;
  })({});
}();
"object" == typeof exports && "undefined" != typeof module && (module.exports = hljs);
hljs.registerLanguage(
  "java",
  (() => {
    return (e) => {
      var n = "false synchronized int abstract float private char boolean var static null if const for true while long strictfp finally protected import native final void enum else break transient catch instanceof byte super volatile case assert short package default double public try this switch continue throws protected public private module requires exports do", a = {
        className: "meta",
        begin: "@[\xC0-\u02B8a-zA-Z_$][\xC0-\u02B8a-zA-Z_$0-9]*",
        contains: [{ begin: /\(/, end: /\)/, contains: ["self"] }]
      }, s = "\\.([0-9](_*[0-9])*)", i = "[0-9a-fA-F](_*[0-9a-fA-F])*", r = {
        className: "number",
        variants: [
          {
            begin: `(\\b([0-9](_*[0-9])*)((${s})|\\.)?|(${s}))[eE][+-]?([0-9](_*[0-9])*)[fFdD]?\\b`
          },
          { begin: `\\b([0-9](_*[0-9])*)((${s})[fFdD]?\\b|\\.([fFdD]\\b)?)` },
          {
            begin: `(${s})[fFdD]?\\b`
          },
          { begin: "\\b([0-9](_*[0-9])*)[fFdD]\\b" },
          {
            begin: `\\b0[xX]((${i})\\.?|(${i})?\\.(${i}))[pP][+-]?([0-9](_*[0-9])*)[fFdD]?\\b`
          },
          { begin: "\\b(0|[1-9](_*[0-9])*)[lL]?\\b" },
          { begin: `\\b0[xX](${i})[lL]?\\b` },
          {
            begin: "\\b0(_*[0-7])*[lL]?\\b"
          },
          { begin: "\\b0[bB][01](_*[01])*[lL]?\\b" }
        ],
        relevance: 0
      };
      return {
        name: "Java",
        aliases: ["jsp"],
        keywords: n,
        illegal: /<\/|#/,
        contains: [
          e.COMMENT("/\\*\\*", "\\*/", {
            relevance: 0,
            contains: [
              { begin: /\w+@/, relevance: 0 },
              { className: "doctag", begin: "@[A-Za-z]+" }
            ]
          }),
          {
            begin: /import java\.[a-z]+\./,
            keywords: "import",
            relevance: 2
          },
          e.C_LINE_COMMENT_MODE,
          e.C_BLOCK_COMMENT_MODE,
          e.APOS_STRING_MODE,
          e.QUOTE_STRING_MODE,
          {
            className: "class",
            beginKeywords: "class interface enum",
            end: /[{;=]/,
            excludeEnd: true,
            keywords: "class interface enum",
            illegal: /[:"\[\]]/,
            contains: [
              {
                beginKeywords: "extends implements"
              },
              e.UNDERSCORE_TITLE_MODE
            ]
          },
          {
            beginKeywords: "new throw return else",
            relevance: 0
          },
          {
            className: "class",
            begin: "record\\s+" + e.UNDERSCORE_IDENT_RE + "\\s*\\(",
            returnBegin: true,
            excludeEnd: true,
            end: /[{;=]/,
            keywords: n,
            contains: [
              { beginKeywords: "record" },
              {
                begin: e.UNDERSCORE_IDENT_RE + "\\s*\\(",
                returnBegin: true,
                relevance: 0,
                contains: [e.UNDERSCORE_TITLE_MODE]
              },
              {
                className: "params",
                begin: /\(/,
                end: /\)/,
                keywords: n,
                relevance: 0,
                contains: [e.C_BLOCK_COMMENT_MODE]
              },
              e.C_LINE_COMMENT_MODE,
              e.C_BLOCK_COMMENT_MODE
            ]
          },
          {
            className: "function",
            begin: "([\xC0-\u02B8a-zA-Z_$][\xC0-\u02B8a-zA-Z_$0-9]*(<[\xC0-\u02B8a-zA-Z_$][\xC0-\u02B8a-zA-Z_$0-9]*(\\s*,\\s*[\xC0-\u02B8a-zA-Z_$][\xC0-\u02B8a-zA-Z_$0-9]*)*>)?\\s+)+" + e.UNDERSCORE_IDENT_RE + "\\s*\\(",
            returnBegin: true,
            end: /[{;=]/,
            excludeEnd: true,
            keywords: n,
            contains: [
              {
                begin: e.UNDERSCORE_IDENT_RE + "\\s*\\(",
                returnBegin: true,
                relevance: 0,
                contains: [e.UNDERSCORE_TITLE_MODE]
              },
              {
                className: "params",
                begin: /\(/,
                end: /\)/,
                keywords: n,
                relevance: 0,
                contains: [
                  a,
                  e.APOS_STRING_MODE,
                  e.QUOTE_STRING_MODE,
                  r,
                  e.C_BLOCK_COMMENT_MODE
                ]
              },
              e.C_LINE_COMMENT_MODE,
              e.C_BLOCK_COMMENT_MODE
            ]
          },
          r,
          a
        ]
      };
    };
  })()
);
hljs.registerLanguage(
  "http",
  (() => {
    return (e) => {
      var n = "HTTP/[0-9\\.]+";
      return {
        name: "HTTP",
        aliases: ["https"],
        illegal: "\\S",
        contains: [
          {
            begin: "^" + n,
            end: "$",
            contains: [{ className: "number", begin: "\\b\\d{3}\\b" }]
          },
          {
            begin: "^[A-Z]+ (.*?) " + n + "$",
            returnBegin: true,
            end: "$",
            contains: [
              {
                className: "string",
                begin: " ",
                end: " ",
                excludeBegin: true,
                excludeEnd: true
              },
              {
                begin: n
              },
              { className: "keyword", begin: "[A-Z]+" }
            ]
          },
          {
            className: "attribute",
            begin: "^\\w",
            end: ": ",
            excludeEnd: true,
            illegal: "\\n|\\s|=",
            starts: { end: "$", relevance: 0 }
          },
          { begin: "\\n\\n", starts: { subLanguage: [], endsWithParent: true } }
        ]
      };
    };
  })()
);
hljs.registerLanguage(
  "nginx",
  (() => {
    return (e) => {
      const n = {
        className: "variable",
        variants: [
          { begin: /\$\d+/ },
          { begin: /\$\{/, end: /\}/ },
          {
            begin: /[$@]/ + e.UNDERSCORE_IDENT_RE
          }
        ]
      }, a = {
        endsWithParent: true,
        keywords: {
          $pattern: "[a-z/_]+",
          literal: "on off yes no true false none blocked debug info notice warn error crit select break last permanent redirect kqueue rtsig epoll poll /dev/poll"
        },
        relevance: 0,
        illegal: "=>",
        contains: [
          e.HASH_COMMENT_MODE,
          {
            className: "string",
            contains: [e.BACKSLASH_ESCAPE, n],
            variants: [
              { begin: /"/, end: /"/ },
              { begin: /'/, end: /'/ }
            ]
          },
          {
            begin: "([a-z]+):/",
            end: "\\s",
            endsWithParent: true,
            excludeEnd: true,
            contains: [n]
          },
          {
            className: "regexp",
            contains: [e.BACKSLASH_ESCAPE, n],
            variants: [
              { begin: "\\s\\^", end: "\\s|\\{|;", returnEnd: true },
              { begin: "~\\*?\\s+", end: "\\s|\\{|;", returnEnd: true },
              {
                begin: "\\*(\\.[a-z\\-]+)+"
              },
              { begin: "([a-z\\-]+\\.)+\\*" }
            ]
          },
          {
            className: "number",
            begin: "\\b\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}(:\\d{1,5})?\\b"
          },
          {
            className: "number",
            begin: "\\b\\d+[kKmMgGdshdwy]*\\b",
            relevance: 0
          },
          n
        ]
      };
      return {
        name: "Nginx config",
        aliases: ["nginxconf"],
        contains: [
          e.HASH_COMMENT_MODE,
          {
            begin: e.UNDERSCORE_IDENT_RE + "\\s+\\{",
            returnBegin: true,
            end: /\{/,
            contains: [
              {
                className: "section",
                begin: e.UNDERSCORE_IDENT_RE
              }
            ],
            relevance: 0
          },
          {
            begin: e.UNDERSCORE_IDENT_RE + "\\s",
            end: ";|\\{",
            returnBegin: true,
            contains: [
              {
                className: "attribute",
                begin: e.UNDERSCORE_IDENT_RE,
                starts: a
              }
            ],
            relevance: 0
          }
        ],
        illegal: "[^\\s\\}]"
      };
    };
  })()
);
hljs.registerLanguage(
  "coffeescript",
  (() => {
    const e = [
      "as",
      "in",
      "of",
      "if",
      "for",
      "while",
      "finally",
      "var",
      "new",
      "function",
      "do",
      "return",
      "void",
      "else",
      "break",
      "catch",
      "instanceof",
      "with",
      "throw",
      "case",
      "default",
      "try",
      "switch",
      "continue",
      "typeof",
      "delete",
      "let",
      "yield",
      "const",
      "class",
      "debugger",
      "async",
      "await",
      "static",
      "import",
      "from",
      "export",
      "extends"
    ], n = ["true", "false", "null", "undefined", "NaN", "Infinity"], a = [].concat(
      [
        "setInterval",
        "setTimeout",
        "clearInterval",
        "clearTimeout",
        "require",
        "exports",
        "eval",
        "isFinite",
        "isNaN",
        "parseFloat",
        "parseInt",
        "decodeURI",
        "decodeURIComponent",
        "encodeURI",
        "encodeURIComponent",
        "escape",
        "unescape"
      ],
      [
        "arguments",
        "this",
        "super",
        "console",
        "window",
        "document",
        "localStorage",
        "module",
        "global"
      ],
      [
        "Intl",
        "DataView",
        "Number",
        "Math",
        "Date",
        "String",
        "RegExp",
        "Object",
        "Function",
        "Boolean",
        "Error",
        "Symbol",
        "Set",
        "Map",
        "WeakSet",
        "WeakMap",
        "Proxy",
        "Reflect",
        "JSON",
        "Promise",
        "Float64Array",
        "Int16Array",
        "Int32Array",
        "Int8Array",
        "Uint16Array",
        "Uint32Array",
        "Float32Array",
        "Array",
        "Uint8Array",
        "Uint8ClampedArray",
        "ArrayBuffer"
      ],
      [
        "EvalError",
        "InternalError",
        "RangeError",
        "ReferenceError",
        "SyntaxError",
        "TypeError",
        "URIError"
      ]
    );
    return (r) => {
      const t = {
        keyword: e.concat([
          "then",
          "unless",
          "until",
          "loop",
          "by",
          "when",
          "and",
          "or",
          "is",
          "isnt",
          "not"
        ]).filter(
          (i = ["var", "const", "let", "function", "static"], (e2) => !i.includes(e2))
        ).join(" "),
        literal: n.concat(["yes", "no", "on", "off"]).join(" "),
        built_in: a.concat(["npm", "print"]).join(" ")
      };
      var i;
      const s = "[A-Za-z$_][0-9A-Za-z$_]*", o = { className: "subst", begin: /#\{/, end: /\}/, keywords: t }, c = [
        r.BINARY_NUMBER_MODE,
        r.inherit(r.C_NUMBER_MODE, {
          starts: {
            end: "(\\s*/)?",
            relevance: 0
          }
        }),
        {
          className: "string",
          variants: [
            { begin: /'''/, end: /'''/, contains: [r.BACKSLASH_ESCAPE] },
            { begin: /'/, end: /'/, contains: [r.BACKSLASH_ESCAPE] },
            { begin: /"""/, end: /"""/, contains: [r.BACKSLASH_ESCAPE, o] },
            { begin: /"/, end: /"/, contains: [r.BACKSLASH_ESCAPE, o] }
          ]
        },
        {
          className: "regexp",
          variants: [
            { begin: "///", end: "///", contains: [o, r.HASH_COMMENT_MODE] },
            { begin: "//[gim]{0,3}(?=\\W)", relevance: 0 },
            { begin: /\/(?![ *]).*?(?![\\]).\/[gim]{0,3}(?=\W)/ }
          ]
        },
        { begin: "@" + s },
        {
          subLanguage: "javascript",
          excludeBegin: true,
          excludeEnd: true,
          variants: [
            {
              begin: "```",
              end: "```"
            },
            { begin: "`", end: "`" }
          ]
        }
      ];
      o.contains = c;
      const l = r.inherit(r.TITLE_MODE, { begin: s }), d = "(\\(.*\\))?\\s*\\B[-=]>", g = {
        className: "params",
        begin: "\\([^\\(]",
        returnBegin: true,
        contains: [
          {
            begin: /\(/,
            end: /\)/,
            keywords: t,
            contains: ["self"].concat(c)
          }
        ]
      };
      return {
        name: "CoffeeScript",
        aliases: ["coffee", "cson", "iced"],
        keywords: t,
        illegal: /\/\*/,
        contains: c.concat([
          r.COMMENT("###", "###"),
          r.HASH_COMMENT_MODE,
          {
            className: "function",
            begin: "^\\s*" + s + "\\s*=\\s*" + d,
            end: "[-=]>",
            returnBegin: true,
            contains: [l, g]
          },
          {
            begin: /[:\(,=]\s*/,
            relevance: 0,
            contains: [
              {
                className: "function",
                begin: d,
                end: "[-=]>",
                returnBegin: true,
                contains: [g]
              }
            ]
          },
          {
            className: "class",
            beginKeywords: "class",
            end: "$",
            illegal: /[:="\[\]]/,
            contains: [
              {
                beginKeywords: "extends",
                endsWithParent: true,
                illegal: /[:="\[\]]/,
                contains: [l]
              },
              l
            ]
          },
          {
            begin: s + ":",
            end: ":",
            returnBegin: true,
            returnEnd: true,
            relevance: 0
          }
        ])
      };
    };
  })()
);
hljs.registerLanguage(
  "cpp",
  (() => {
    return (e) => {
      const t = ((e2) => {
        function t2(e3) {
          return "(?:" + e3 + ")?";
        }
        var n = e2.COMMENT("//", "$", {
          contains: [
            {
              begin: /\\\n/
            }
          ]
        }), r = "[a-zA-Z_]\\w*::", a = "(decltype\\(auto\\)|" + t2(r) + "[a-zA-Z_]\\w*" + t2("<.*?>") + ")", i = {
          className: "keyword",
          begin: "\\b[a-z\\d_]*_t\\b"
        }, s = {
          className: "string",
          variants: [
            {
              begin: '(u8?|U|L)?"',
              end: '"',
              illegal: "\\n",
              contains: [e2.BACKSLASH_ESCAPE]
            },
            {
              begin: "(u8?|U|L)?'(\\\\(x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4,8}|[0-7]{3}|\\S)|.)",
              end: "'",
              illegal: "."
            },
            e2.END_SAME_AS_BEGIN({
              begin: /(?:u8?|U|L)?R"([^()\\ ]{0,16})\(/,
              end: /\)([^()\\ ]{0,16})"/
            })
          ]
        }, c = {
          className: "number",
          variants: [
            { begin: "\\b(0b[01']+)" },
            {
              begin: "(-?)\\b([\\d']+(\\.[\\d']*)?|\\.[\\d']+)(u|U|l|L|ul|UL|f|F|b|B)"
            },
            {
              begin: "(-?)(\\b0[xX][a-fA-F0-9']+|(\\b[\\d']+(\\.[\\d']*)?|\\.[\\d']+)([eE][-+]?[\\d']+)?)"
            }
          ],
          relevance: 0
        }, o = {
          className: "meta",
          begin: /#\s*[a-z]+\b/,
          end: /$/,
          keywords: {
            "meta-keyword": "if else elif endif define undef warning error line pragma _Pragma ifdef ifndef include"
          },
          contains: [
            { begin: /\\\n/, relevance: 0 },
            e2.inherit(s, { className: "meta-string" }),
            {
              className: "meta-string",
              begin: /<.*?>/,
              end: /$/,
              illegal: "\\n"
            },
            n,
            e2.C_BLOCK_COMMENT_MODE
          ]
        }, l = { className: "title", begin: t2(r) + e2.IDENT_RE, relevance: 0 }, d = t2(r) + e2.IDENT_RE + "\\s*\\(", u = {
          keyword: "int float while private char char8_t char16_t char32_t catch import module export virtual operator sizeof dynamic_cast|10 typedef const_cast|10 const for static_cast|10 union namespace unsigned long volatile static protected bool template mutable if public friend do goto auto void enum else break extern using asm case typeid wchar_t short reinterpret_cast|10 default double register explicit signed typename try this switch continue inline delete alignas alignof constexpr consteval constinit decltype concept co_await co_return co_yield requires noexcept static_assert thread_local restrict final override atomic_bool atomic_char atomic_schar atomic_uchar atomic_short atomic_ushort atomic_int atomic_uint atomic_long atomic_ulong atomic_llong atomic_ullong new throw return and and_eq bitand bitor compl not not_eq or or_eq xor xor_eq",
          built_in: "std string wstring cin cout cerr clog stdin stdout stderr stringstream istringstream ostringstream auto_ptr deque list queue stack vector map set pair bitset multiset multimap unordered_set unordered_map unordered_multiset unordered_multimap priority_queue make_pair array shared_ptr abort terminate abs acos asin atan2 atan calloc ceil cosh cos exit exp fabs floor fmod fprintf fputs free frexp fscanf future isalnum isalpha iscntrl isdigit isgraph islower isprint ispunct isspace isupper isxdigit tolower toupper labs ldexp log10 log malloc realloc memchr memcmp memcpy memset modf pow printf putchar puts scanf sinh sin snprintf sprintf sqrt sscanf strcat strchr strcmp strcpy strcspn strlen strncat strncmp strncpy strpbrk strrchr strspn strstr tanh tan vfprintf vprintf vsprintf endl initializer_list unique_ptr _Bool complex _Complex imaginary _Imaginary",
          literal: "true false nullptr NULL"
        }, m = [o, i, n, e2.C_BLOCK_COMMENT_MODE, c, s], p = {
          variants: [
            { begin: /=/, end: /;/ },
            { begin: /\(/, end: /\)/ },
            {
              beginKeywords: "new throw return else",
              end: /;/
            }
          ],
          keywords: u,
          contains: m.concat([
            {
              begin: /\(/,
              end: /\)/,
              keywords: u,
              contains: m.concat(["self"]),
              relevance: 0
            }
          ]),
          relevance: 0
        }, _ = {
          className: "function",
          begin: "(" + a + "[\\*&\\s]+)+" + d,
          returnBegin: true,
          end: /[{;=]/,
          excludeEnd: true,
          keywords: u,
          illegal: /[^\w\s\*&:<>]/,
          contains: [
            { begin: "decltype\\(auto\\)", keywords: u, relevance: 0 },
            { begin: d, returnBegin: true, contains: [l], relevance: 0 },
            {
              className: "params",
              begin: /\(/,
              end: /\)/,
              keywords: u,
              relevance: 0,
              contains: [
                n,
                e2.C_BLOCK_COMMENT_MODE,
                s,
                c,
                i,
                {
                  begin: /\(/,
                  end: /\)/,
                  keywords: u,
                  relevance: 0,
                  contains: ["self", n, e2.C_BLOCK_COMMENT_MODE, s, c, i]
                }
              ]
            },
            i,
            n,
            e2.C_BLOCK_COMMENT_MODE,
            o
          ]
        };
        return {
          aliases: ["c", "cc", "h", "c++", "h++", "hpp", "hh", "hxx", "cxx"],
          keywords: u,
          disableAutodetect: true,
          illegal: "</",
          contains: [].concat(p, _, m, [
            o,
            {
              begin: "\\b(deque|list|queue|priority_queue|pair|stack|vector|map|set|bitset|multiset|multimap|unordered_map|unordered_set|unordered_multiset|unordered_multimap|array)\\s*<",
              end: ">",
              keywords: u,
              contains: ["self", i]
            },
            { begin: e2.IDENT_RE + "::", keywords: u },
            {
              className: "class",
              beginKeywords: "enum class struct union",
              end: /[{;:<>=]/,
              contains: [{ beginKeywords: "final class struct" }, e2.TITLE_MODE]
            }
          ]),
          exports: {
            preprocessor: o,
            strings: s,
            keywords: u
          }
        };
      })(e);
      return t.disableAutodetect = false, t.name = "C++", t.aliases = ["cc", "c++", "h++", "hpp", "hh", "hxx", "cxx"], t;
    };
  })()
);
hljs.registerLanguage(
  "objectivec",
  (() => {
    return (e) => {
      const n = /[a-zA-Z@][a-zA-Z0-9_]*/, _ = {
        $pattern: n,
        keyword: "@interface @class @protocol @implementation"
      };
      return {
        name: "Objective-C",
        aliases: ["mm", "objc", "obj-c", "obj-c++", "objective-c++"],
        keywords: {
          $pattern: n,
          keyword: "int float while char export sizeof typedef const struct for union unsigned long volatile static bool mutable if do return goto void enum else break extern asm case short default double register explicit signed typename this switch continue wchar_t inline readonly assign readwrite self @synchronized id typeof nonatomic super unichar IBOutlet IBAction strong weak copy in out inout bycopy byref oneway __strong __weak __block __autoreleasing @private @protected @public @try @property @end @throw @catch @finally @autoreleasepool @synthesize @dynamic @selector @optional @required @encode @package @import @defs @compatibility_alias __bridge __bridge_transfer __bridge_retained __bridge_retain __covariant __contravariant __kindof _Nonnull _Nullable _Null_unspecified __FUNCTION__ __PRETTY_FUNCTION__ __attribute__ getter setter retain unsafe_unretained nonnull nullable null_unspecified null_resettable class instancetype NS_DESIGNATED_INITIALIZER NS_UNAVAILABLE NS_REQUIRES_SUPER NS_RETURNS_INNER_POINTER NS_INLINE NS_AVAILABLE NS_DEPRECATED NS_ENUM NS_OPTIONS NS_SWIFT_UNAVAILABLE NS_ASSUME_NONNULL_BEGIN NS_ASSUME_NONNULL_END NS_REFINED_FOR_SWIFT NS_SWIFT_NAME NS_SWIFT_NOTHROW NS_DURING NS_HANDLER NS_ENDHANDLER NS_VALUERETURN NS_VOIDRETURN",
          literal: "false true FALSE TRUE nil YES NO NULL",
          built_in: "BOOL dispatch_once_t dispatch_queue_t dispatch_sync dispatch_async dispatch_once"
        },
        illegal: "</",
        contains: [
          {
            className: "built_in",
            begin: "\\b(AV|CA|CF|CG|CI|CL|CM|CN|CT|MK|MP|MTK|MTL|NS|SCN|SK|UI|WK|XC)\\w+"
          },
          e.C_LINE_COMMENT_MODE,
          e.C_BLOCK_COMMENT_MODE,
          e.C_NUMBER_MODE,
          e.QUOTE_STRING_MODE,
          e.APOS_STRING_MODE,
          {
            className: "string",
            variants: [
              {
                begin: '@"',
                end: '"',
                illegal: "\\n",
                contains: [e.BACKSLASH_ESCAPE]
              }
            ]
          },
          {
            className: "meta",
            begin: /#\s*[a-z]+\b/,
            end: /$/,
            keywords: {
              "meta-keyword": "if else elif endif define undef warning error line pragma ifdef ifndef include"
            },
            contains: [
              { begin: /\\\n/, relevance: 0 },
              e.inherit(e.QUOTE_STRING_MODE, {
                className: "meta-string"
              }),
              {
                className: "meta-string",
                begin: /<.*?>/,
                end: /$/,
                illegal: "\\n"
              },
              e.C_LINE_COMMENT_MODE,
              e.C_BLOCK_COMMENT_MODE
            ]
          },
          {
            className: "class",
            begin: "(" + _.keyword.split(" ").join("|") + ")\\b",
            end: /(\{|$)/,
            excludeEnd: true,
            keywords: _,
            contains: [e.UNDERSCORE_TITLE_MODE]
          },
          {
            begin: "\\." + e.UNDERSCORE_IDENT_RE,
            relevance: 0
          }
        ]
      };
    };
  })()
);
hljs.registerLanguage(
  "less",
  (() => {
    return (e) => {
      var n = "([\\w-]+|@\\{[\\w-]+\\})", a = [], s = [], t = (e2) => ({ className: "string", begin: "~?" + e2 + ".*?" + e2 }), r = (e2, n2, a2) => ({ className: e2, begin: n2, relevance: a2 }), i = {
        begin: "\\(",
        end: "\\)",
        contains: s,
        relevance: 0
      };
      s.push(
        e.C_LINE_COMMENT_MODE,
        e.C_BLOCK_COMMENT_MODE,
        t("'"),
        t('"'),
        e.CSS_NUMBER_MODE,
        {
          begin: "(url|data-uri)\\(",
          starts: { className: "string", end: "[\\)\\n]", excludeEnd: true }
        },
        r("number", "#[0-9A-Fa-f]+\\b"),
        i,
        r("variable", "@@?[\\w-]+", 10),
        r("variable", "@\\{[\\w-]+\\}"),
        r("built_in", "~?`[^`]*?`"),
        {
          className: "attribute",
          begin: "[\\w-]+\\s*:",
          end: ":",
          returnBegin: true,
          excludeEnd: true
        },
        { className: "meta", begin: "!important" }
      );
      var c = s.concat({ begin: /\{/, end: /\}/, contains: a }), l = {
        beginKeywords: "when",
        endsWithParent: true,
        contains: [
          {
            beginKeywords: "and not"
          }
        ].concat(s)
      }, g = {
        begin: n + "\\s*:",
        returnBegin: true,
        end: "[;}]",
        relevance: 0,
        contains: [
          {
            className: "attribute",
            begin: n,
            end: ":",
            excludeEnd: true,
            starts: {
              endsWithParent: true,
              illegal: "[<=$]",
              relevance: 0,
              contains: s
            }
          }
        ]
      }, d = {
        className: "keyword",
        begin: "@(import|media|charset|font-face|(-[a-z]+-)?keyframes|supports|document|namespace|page|viewport|host)\\b",
        starts: { end: "[;{}]", returnEnd: true, contains: s, relevance: 0 }
      }, o = {
        className: "variable",
        variants: [
          { begin: "@[\\w-]+\\s*:", relevance: 15 },
          {
            begin: "@[\\w-]+"
          }
        ],
        starts: { end: "[;}]", returnEnd: true, contains: c }
      }, b = {
        variants: [
          {
            begin: "[\\.#:&\\[>]",
            end: "[;{}]"
          },
          { begin: n, end: /\{/ }
        ],
        returnBegin: true,
        returnEnd: true,
        illegal: `[<='$"]`,
        relevance: 0,
        contains: [
          e.C_LINE_COMMENT_MODE,
          e.C_BLOCK_COMMENT_MODE,
          l,
          r("keyword", "all\\b"),
          r("variable", "@\\{[\\w-]+\\}"),
          r("selector-tag", n + "%?", 0),
          r("selector-id", "#" + n),
          r("selector-class", "\\." + n, 0),
          r("selector-tag", "&", 0),
          {
            className: "selector-attr",
            begin: "\\[",
            end: "\\]"
          },
          {
            className: "selector-pseudo",
            begin: /:(:)?[a-zA-Z0-9_\-+()"'.]+/
          },
          { begin: "\\(", end: "\\)", contains: c },
          {
            begin: "!important"
          }
        ]
      };
      return a.push(e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE, d, o, g, b), {
        name: "Less",
        case_insensitive: true,
        illegal: `[=>'/<($"]`,
        contains: a
      };
    };
  })()
);
hljs.registerLanguage(
  "typescript",
  (() => {
    const e = "[A-Za-z$_][0-9A-Za-z$_]*", n = [
      "as",
      "in",
      "of",
      "if",
      "for",
      "while",
      "finally",
      "var",
      "new",
      "function",
      "do",
      "return",
      "void",
      "else",
      "break",
      "catch",
      "instanceof",
      "with",
      "throw",
      "case",
      "default",
      "try",
      "switch",
      "continue",
      "typeof",
      "delete",
      "let",
      "yield",
      "const",
      "class",
      "debugger",
      "async",
      "await",
      "static",
      "import",
      "from",
      "export",
      "extends"
    ], a = ["true", "false", "null", "undefined", "NaN", "Infinity"], s = [].concat(
      [
        "setInterval",
        "setTimeout",
        "clearInterval",
        "clearTimeout",
        "require",
        "exports",
        "eval",
        "isFinite",
        "isNaN",
        "parseFloat",
        "parseInt",
        "decodeURI",
        "decodeURIComponent",
        "encodeURI",
        "encodeURIComponent",
        "escape",
        "unescape"
      ],
      [
        "arguments",
        "this",
        "super",
        "console",
        "window",
        "document",
        "localStorage",
        "module",
        "global"
      ],
      [
        "Intl",
        "DataView",
        "Number",
        "Math",
        "Date",
        "String",
        "RegExp",
        "Object",
        "Function",
        "Boolean",
        "Error",
        "Symbol",
        "Set",
        "Map",
        "WeakSet",
        "WeakMap",
        "Proxy",
        "Reflect",
        "JSON",
        "Promise",
        "Float64Array",
        "Int16Array",
        "Int32Array",
        "Int8Array",
        "Uint16Array",
        "Uint32Array",
        "Float32Array",
        "Array",
        "Uint8Array",
        "Uint8ClampedArray",
        "ArrayBuffer"
      ],
      [
        "EvalError",
        "InternalError",
        "RangeError",
        "ReferenceError",
        "SyntaxError",
        "TypeError",
        "URIError"
      ]
    );
    function t(e2) {
      return i("(?=", e2, ")");
    }
    function i(...e2) {
      return e2.map((e3) => {
        return (n2 = e3) ? "string" == typeof n2 ? n2 : n2.source : null;
        var n2;
      }).join("");
    }
    return (r) => {
      const c = {
        $pattern: e,
        keyword: n.concat([
          "type",
          "namespace",
          "typedef",
          "interface",
          "public",
          "private",
          "protected",
          "implements",
          "declare",
          "abstract",
          "readonly"
        ]).join(" "),
        literal: a.join(" "),
        built_in: s.concat([
          "any",
          "void",
          "number",
          "boolean",
          "string",
          "object",
          "never",
          "enum"
        ]).join(" ")
      }, o = { className: "meta", begin: "@[A-Za-z$_][0-9A-Za-z$_]*" }, l = (e2, n2, a2) => {
        const s2 = e2.contains.findIndex((e3) => e3.label === n2);
        if (-1 === s2)
          throw Error("can not find mode to replace");
        e2.contains.splice(s2, 1, a2);
      }, b = ((r2) => {
        const c2 = e, o2 = {
          begin: /<[A-Za-z0-9\\._:-]+/,
          end: /\/[A-Za-z0-9\\._:-]+>|\/>/,
          isTrulyOpeningTag: (e2, n2) => {
            const a2 = e2[0].length + e2.index, s2 = e2.input[a2];
            "<" !== s2 ? ">" === s2 && (((e3, { after: n3 }) => {
              const a3 = "</" + e3[0].slice(1);
              return -1 !== e3.input.indexOf(a3, n3);
            })(e2, { after: a2 }) || n2.ignoreMatch()) : n2.ignoreMatch();
          }
        }, l2 = {
          $pattern: e,
          keyword: n.join(" "),
          literal: a.join(" "),
          built_in: s.join(" ")
        }, b2 = "\\.([0-9](_?[0-9])*)", d = "0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*", g = {
          className: "number",
          variants: [
            {
              begin: `(\\b(${d})((${b2})|\\.)?|(${b2}))[eE][+-]?([0-9](_?[0-9])*)\\b`
            },
            {
              begin: `\\b(${d})\\b((${b2})\\b|\\.)?|(${b2})\\b`
            },
            {
              begin: "\\b(0|[1-9](_?[0-9])*)n\\b"
            },
            {
              begin: "\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b"
            },
            {
              begin: "\\b0[bB][0-1](_?[0-1])*n?\\b"
            },
            { begin: "\\b0[oO][0-7](_?[0-7])*n?\\b" },
            {
              begin: "\\b0[0-7]+n?\\b"
            }
          ],
          relevance: 0
        }, u = {
          className: "subst",
          begin: "\\$\\{",
          end: "\\}",
          keywords: l2,
          contains: []
        }, E = {
          begin: "html`",
          end: "",
          starts: {
            end: "`",
            returnEnd: false,
            contains: [r2.BACKSLASH_ESCAPE, u],
            subLanguage: "xml"
          }
        }, m = {
          begin: "css`",
          end: "",
          starts: {
            end: "`",
            returnEnd: false,
            contains: [r2.BACKSLASH_ESCAPE, u],
            subLanguage: "css"
          }
        }, _ = {
          className: "string",
          begin: "`",
          end: "`",
          contains: [r2.BACKSLASH_ESCAPE, u]
        }, y = {
          className: "comment",
          variants: [
            r2.COMMENT("/\\*\\*", "\\*/", {
              relevance: 0,
              contains: [
                {
                  className: "doctag",
                  begin: "@[A-Za-z]+",
                  contains: [
                    {
                      className: "type",
                      begin: "\\{",
                      end: "\\}",
                      relevance: 0
                    },
                    {
                      className: "variable",
                      begin: c2 + "(?=\\s*(-)|$)",
                      endsParent: true,
                      relevance: 0
                    },
                    {
                      begin: /(?=[^\n])\s/,
                      relevance: 0
                    }
                  ]
                }
              ]
            }),
            r2.C_BLOCK_COMMENT_MODE,
            r2.C_LINE_COMMENT_MODE
          ]
        }, p = [
          r2.APOS_STRING_MODE,
          r2.QUOTE_STRING_MODE,
          E,
          m,
          _,
          g,
          r2.REGEXP_MODE
        ];
        u.contains = p.concat({
          begin: /\{/,
          end: /\}/,
          keywords: l2,
          contains: ["self"].concat(p)
        });
        const N = [].concat(y, u.contains), f = N.concat([
          {
            begin: /\(/,
            end: /\)/,
            keywords: l2,
            contains: ["self"].concat(N)
          }
        ]), A = {
          className: "params",
          begin: /\(/,
          end: /\)/,
          excludeBegin: true,
          excludeEnd: true,
          keywords: l2,
          contains: f
        };
        return {
          name: "Javascript",
          aliases: ["js", "jsx", "mjs", "cjs"],
          keywords: l2,
          exports: { PARAMS_CONTAINS: f },
          illegal: /#(?![$_A-z])/,
          contains: [
            r2.SHEBANG({ label: "shebang", binary: "node", relevance: 5 }),
            {
              label: "use_strict",
              className: "meta",
              relevance: 10,
              begin: /^\s*['"]use (strict|asm)['"]/
            },
            r2.APOS_STRING_MODE,
            r2.QUOTE_STRING_MODE,
            E,
            m,
            _,
            y,
            g,
            {
              begin: i(
                /[{,\n]\s*/,
                t(
                  i(/(((\/\/.*$)|(\/\*(\*[^/]|[^*])*\*\/))\s*)*/, c2 + "\\s*:")
                )
              ),
              relevance: 0,
              contains: [
                { className: "attr", begin: c2 + t("\\s*:"), relevance: 0 }
              ]
            },
            {
              begin: "(" + r2.RE_STARTERS_RE + "|\\b(case|return|throw)\\b)\\s*",
              keywords: "return throw case",
              contains: [
                y,
                r2.REGEXP_MODE,
                {
                  className: "function",
                  begin: "(\\([^()]*(\\([^()]*(\\([^()]*\\))*[^()]*\\))*[^()]*\\)|" + r2.UNDERSCORE_IDENT_RE + ")\\s*=>",
                  returnBegin: true,
                  end: "\\s*=>",
                  contains: [
                    {
                      className: "params",
                      variants: [
                        {
                          begin: r2.UNDERSCORE_IDENT_RE,
                          relevance: 0
                        },
                        { className: null, begin: /\(\s*\)/, skip: true },
                        {
                          begin: /\(/,
                          end: /\)/,
                          excludeBegin: true,
                          excludeEnd: true,
                          keywords: l2,
                          contains: f
                        }
                      ]
                    }
                  ]
                },
                { begin: /,/, relevance: 0 },
                { className: "", begin: /\s/, end: /\s*/, skip: true },
                {
                  variants: [
                    { begin: "<>", end: "</>" },
                    {
                      begin: o2.begin,
                      "on:begin": o2.isTrulyOpeningTag,
                      end: o2.end
                    }
                  ],
                  subLanguage: "xml",
                  contains: [
                    {
                      begin: o2.begin,
                      end: o2.end,
                      skip: true,
                      contains: ["self"]
                    }
                  ]
                }
              ],
              relevance: 0
            },
            {
              className: "function",
              beginKeywords: "function",
              end: /[{;]/,
              excludeEnd: true,
              keywords: l2,
              contains: ["self", r2.inherit(r2.TITLE_MODE, { begin: c2 }), A],
              illegal: /%/
            },
            {
              beginKeywords: "while if switch catch for"
            },
            {
              className: "function",
              begin: r2.UNDERSCORE_IDENT_RE + "\\([^()]*(\\([^()]*(\\([^()]*\\))*[^()]*\\))*[^()]*\\)\\s*\\{",
              returnBegin: true,
              contains: [A, r2.inherit(r2.TITLE_MODE, { begin: c2 })]
            },
            {
              variants: [
                {
                  begin: "\\." + c2
                },
                { begin: "\\$" + c2 }
              ],
              relevance: 0
            },
            {
              className: "class",
              beginKeywords: "class",
              end: /[{;=]/,
              excludeEnd: true,
              illegal: /[:"[\]]/,
              contains: [
                {
                  beginKeywords: "extends"
                },
                r2.UNDERSCORE_TITLE_MODE
              ]
            },
            {
              begin: /\b(?=constructor)/,
              end: /[{;]/,
              excludeEnd: true,
              contains: [r2.inherit(r2.TITLE_MODE, { begin: c2 }), "self", A]
            },
            {
              begin: "(get|set)\\s+(?=" + c2 + "\\()",
              end: /\{/,
              keywords: "get set",
              contains: [
                r2.inherit(r2.TITLE_MODE, { begin: c2 }),
                { begin: /\(\)/ },
                A
              ]
            },
            { begin: /\$[(.]/ }
          ]
        };
      })(r);
      return Object.assign(b.keywords, c), b.exports.PARAMS_CONTAINS.push(o), b.contains = b.contains.concat([
        o,
        {
          beginKeywords: "namespace",
          end: /\{/,
          excludeEnd: true
        },
        {
          beginKeywords: "interface",
          end: /\{/,
          excludeEnd: true,
          keywords: "interface extends"
        }
      ]), l(b, "shebang", r.SHEBANG()), l(b, "use_strict", {
        className: "meta",
        relevance: 10,
        begin: /^\s*['"]use strict['"]/
      }), b.contains.find((e2) => "function" === e2.className).relevance = 0, Object.assign(b, {
        name: "TypeScript",
        aliases: ["ts"]
      }), b;
    };
  })()
);
hljs.registerLanguage(
  "ruby",
  (() => {
    function e(...e2) {
      return e2.map((e3) => {
        return (n = e3) ? "string" == typeof n ? n : n.source : null;
        var n;
      }).join("");
    }
    return (n) => {
      var a, i = "([a-zA-Z_]\\w*[!?=]?|[-+~]@|<<|>>|=~|===?|<=>|[<>]=?|\\*\\*|[-/+%^&*~`|]|\\[\\]=?)", s = {
        keyword: "and then defined module in return redo if BEGIN retry end for self when next until do begin unless END rescue else break undef not super class case require yield alias while ensure elsif or include attr_reader attr_writer attr_accessor __FILE__",
        built_in: "proc lambda",
        literal: "true false nil"
      }, r = { className: "doctag", begin: "@[A-Za-z]+" }, b = { begin: "#<", end: ">" }, t = [
        n.COMMENT("#", "$", { contains: [r] }),
        n.COMMENT("^=begin", "^=end", { contains: [r], relevance: 10 }),
        n.COMMENT("^__END__", "\\n$")
      ], c = { className: "subst", begin: /#\{/, end: /\}/, keywords: s }, d = {
        className: "string",
        contains: [n.BACKSLASH_ESCAPE, c],
        variants: [
          {
            begin: /'/,
            end: /'/
          },
          { begin: /"/, end: /"/ },
          { begin: /`/, end: /`/ },
          { begin: /%[qQwWx]?\(/, end: /\)/ },
          { begin: /%[qQwWx]?\[/, end: /\]/ },
          { begin: /%[qQwWx]?\{/, end: /\}/ },
          {
            begin: /%[qQwWx]?</,
            end: />/
          },
          { begin: /%[qQwWx]?\//, end: /\// },
          { begin: /%[qQwWx]?%/, end: /%/ },
          { begin: /%[qQwWx]?-/, end: /-/ },
          { begin: /%[qQwWx]?\|/, end: /\|/ },
          {
            begin: /\B\?(\\\d{1,3}|\\x[A-Fa-f0-9]{1,2}|\\u[A-Fa-f0-9]{4}|\\?\S)\b/
          },
          {
            begin: /<<[-~]?'?(\w+)(?:.|\n)*?\n\s*\1\b/,
            returnBegin: true,
            contains: [
              {
                begin: /<<[-~]?'?/
              },
              n.END_SAME_AS_BEGIN({
                begin: /(\w+)/,
                end: /(\w+)/,
                contains: [n.BACKSLASH_ESCAPE, c]
              })
            ]
          }
        ]
      }, g = "[0-9](_?[0-9])*", l = {
        className: "number",
        relevance: 0,
        variants: [
          {
            begin: `\\b([1-9](_?[0-9])*|0)(\\.(${g}))?([eE][+-]?(${g})|r)?i?\\b`
          },
          {
            begin: "\\b0[dD][0-9](_?[0-9])*r?i?\\b"
          },
          { begin: "\\b0[bB][0-1](_?[0-1])*r?i?\\b" },
          { begin: "\\b0[oO][0-7](_?[0-7])*r?i?\\b" },
          {
            begin: "\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*r?i?\\b"
          },
          {
            begin: "\\b0(_?[0-7])+r?i?\\b"
          }
        ]
      }, o = {
        className: "params",
        begin: "\\(",
        end: "\\)",
        endsParent: true,
        keywords: s
      }, _ = [
        d,
        {
          className: "class",
          beginKeywords: "class module",
          end: "$|;",
          illegal: /=/,
          contains: [
            n.inherit(n.TITLE_MODE, {
              begin: "[A-Za-z_]\\w*(::\\w+)*(\\?|!)?"
            }),
            {
              begin: "<\\s*",
              contains: [
                {
                  begin: "(" + n.IDENT_RE + "::)?" + n.IDENT_RE
                }
              ]
            }
          ].concat(t)
        },
        {
          className: "function",
          begin: e(/def\s*/, (a = i + "\\s*(\\(|;|$)", e("(?=", a, ")"))),
          keywords: "def",
          end: "$|;",
          contains: [n.inherit(n.TITLE_MODE, { begin: i }), o].concat(t)
        },
        { begin: n.IDENT_RE + "::" },
        {
          className: "symbol",
          begin: n.UNDERSCORE_IDENT_RE + "(!|\\?)?:",
          relevance: 0
        },
        {
          className: "symbol",
          begin: ":(?!\\s)",
          contains: [d, { begin: i }],
          relevance: 0
        },
        l,
        {
          className: "variable",
          begin: "(\\$\\W)|((\\$|@@?)(\\w+))(?=[^@$?])(?![A-Za-z])(?![@$?'])"
        },
        {
          className: "params",
          begin: /\|/,
          end: /\|/,
          relevance: 0,
          keywords: s
        },
        {
          begin: "(" + n.RE_STARTERS_RE + "|unless)\\s*",
          keywords: "unless",
          contains: [
            {
              className: "regexp",
              contains: [n.BACKSLASH_ESCAPE, c],
              illegal: /\n/,
              variants: [
                {
                  begin: "/",
                  end: "/[a-z]*"
                },
                { begin: /%r\{/, end: /\}[a-z]*/ },
                { begin: "%r\\(", end: "\\)[a-z]*" },
                { begin: "%r!", end: "![a-z]*" },
                { begin: "%r\\[", end: "\\][a-z]*" }
              ]
            }
          ].concat(b, t),
          relevance: 0
        }
      ].concat(b, t);
      c.contains = _, o.contains = _;
      var E = [
        {
          begin: /^\s*=>/,
          starts: { end: "$", contains: _ }
        },
        {
          className: "meta",
          begin: "^([>?]>|[\\w#]+\\(\\w+\\):\\d+:\\d+>|(\\w+-)?\\d+\\.\\d+\\.\\d(p\\d+)?[^>]+>)(?=[ ])",
          starts: { end: "$", contains: _ }
        }
      ];
      return t.unshift(b), {
        name: "Ruby",
        aliases: ["rb", "gemspec", "podspec", "thor", "irb"],
        keywords: s,
        illegal: /\/\*/,
        contains: [n.SHEBANG({ binary: "ruby" })].concat(E).concat(t).concat(_)
      };
    };
  })()
);
hljs.registerLanguage(
  "json",
  (() => {
    return (n) => {
      const e = {
        literal: "true false null"
      }, i = [n.C_LINE_COMMENT_MODE, n.C_BLOCK_COMMENT_MODE], a = [n.QUOTE_STRING_MODE, n.C_NUMBER_MODE], l = {
        end: ",",
        endsWithParent: true,
        excludeEnd: true,
        contains: a,
        keywords: e
      }, t = {
        begin: /\{/,
        end: /\}/,
        contains: [
          {
            className: "attr",
            begin: /"/,
            end: /"/,
            contains: [n.BACKSLASH_ESCAPE],
            illegal: "\\n"
          },
          n.inherit(l, { begin: /:/ })
        ].concat(i),
        illegal: "\\S"
      }, s = {
        begin: "\\[",
        end: "\\]",
        contains: [n.inherit(l)],
        illegal: "\\S"
      };
      return a.push(t, s), i.forEach((n2) => {
        a.push(n2);
      }), { name: "JSON", contains: a, keywords: e, illegal: "\\S" };
    };
  })()
);
hljs.registerLanguage(
  "c",
  (() => {
    return (e) => {
      const t = ((e2) => {
        function t2(e3) {
          return "(?:" + e3 + ")?";
        }
        var n = e2.COMMENT("//", "$", {
          contains: [
            {
              begin: /\\\n/
            }
          ]
        }), r = "[a-zA-Z_]\\w*::", a = "(decltype\\(auto\\)|" + t2(r) + "[a-zA-Z_]\\w*" + t2("<.*?>") + ")", i = {
          className: "keyword",
          begin: "\\b[a-z\\d_]*_t\\b"
        }, s = {
          className: "string",
          variants: [
            {
              begin: '(u8?|U|L)?"',
              end: '"',
              illegal: "\\n",
              contains: [e2.BACKSLASH_ESCAPE]
            },
            {
              begin: "(u8?|U|L)?'(\\\\(x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4,8}|[0-7]{3}|\\S)|.)",
              end: "'",
              illegal: "."
            },
            e2.END_SAME_AS_BEGIN({
              begin: /(?:u8?|U|L)?R"([^()\\ ]{0,16})\(/,
              end: /\)([^()\\ ]{0,16})"/
            })
          ]
        }, c = {
          className: "number",
          variants: [
            { begin: "\\b(0b[01']+)" },
            {
              begin: "(-?)\\b([\\d']+(\\.[\\d']*)?|\\.[\\d']+)(u|U|l|L|ul|UL|f|F|b|B)"
            },
            {
              begin: "(-?)(\\b0[xX][a-fA-F0-9']+|(\\b[\\d']+(\\.[\\d']*)?|\\.[\\d']+)([eE][-+]?[\\d']+)?)"
            }
          ],
          relevance: 0
        }, o = {
          className: "meta",
          begin: /#\s*[a-z]+\b/,
          end: /$/,
          keywords: {
            "meta-keyword": "if else elif endif define undef warning error line pragma _Pragma ifdef ifndef include"
          },
          contains: [
            { begin: /\\\n/, relevance: 0 },
            e2.inherit(s, { className: "meta-string" }),
            {
              className: "meta-string",
              begin: /<.*?>/,
              end: /$/,
              illegal: "\\n"
            },
            n,
            e2.C_BLOCK_COMMENT_MODE
          ]
        }, l = { className: "title", begin: t2(r) + e2.IDENT_RE, relevance: 0 }, d = t2(r) + e2.IDENT_RE + "\\s*\\(", u = {
          keyword: "int float while private char char8_t char16_t char32_t catch import module export virtual operator sizeof dynamic_cast|10 typedef const_cast|10 const for static_cast|10 union namespace unsigned long volatile static protected bool template mutable if public friend do goto auto void enum else break extern using asm case typeid wchar_t short reinterpret_cast|10 default double register explicit signed typename try this switch continue inline delete alignas alignof constexpr consteval constinit decltype concept co_await co_return co_yield requires noexcept static_assert thread_local restrict final override atomic_bool atomic_char atomic_schar atomic_uchar atomic_short atomic_ushort atomic_int atomic_uint atomic_long atomic_ulong atomic_llong atomic_ullong new throw return and and_eq bitand bitor compl not not_eq or or_eq xor xor_eq",
          built_in: "std string wstring cin cout cerr clog stdin stdout stderr stringstream istringstream ostringstream auto_ptr deque list queue stack vector map set pair bitset multiset multimap unordered_set unordered_map unordered_multiset unordered_multimap priority_queue make_pair array shared_ptr abort terminate abs acos asin atan2 atan calloc ceil cosh cos exit exp fabs floor fmod fprintf fputs free frexp fscanf future isalnum isalpha iscntrl isdigit isgraph islower isprint ispunct isspace isupper isxdigit tolower toupper labs ldexp log10 log malloc realloc memchr memcmp memcpy memset modf pow printf putchar puts scanf sinh sin snprintf sprintf sqrt sscanf strcat strchr strcmp strcpy strcspn strlen strncat strncmp strncpy strpbrk strrchr strspn strstr tanh tan vfprintf vprintf vsprintf endl initializer_list unique_ptr _Bool complex _Complex imaginary _Imaginary",
          literal: "true false nullptr NULL"
        }, m = [o, i, n, e2.C_BLOCK_COMMENT_MODE, c, s], p = {
          variants: [
            { begin: /=/, end: /;/ },
            { begin: /\(/, end: /\)/ },
            {
              beginKeywords: "new throw return else",
              end: /;/
            }
          ],
          keywords: u,
          contains: m.concat([
            {
              begin: /\(/,
              end: /\)/,
              keywords: u,
              contains: m.concat(["self"]),
              relevance: 0
            }
          ]),
          relevance: 0
        }, _ = {
          className: "function",
          begin: "(" + a + "[\\*&\\s]+)+" + d,
          returnBegin: true,
          end: /[{;=]/,
          excludeEnd: true,
          keywords: u,
          illegal: /[^\w\s\*&:<>]/,
          contains: [
            { begin: "decltype\\(auto\\)", keywords: u, relevance: 0 },
            { begin: d, returnBegin: true, contains: [l], relevance: 0 },
            {
              className: "params",
              begin: /\(/,
              end: /\)/,
              keywords: u,
              relevance: 0,
              contains: [
                n,
                e2.C_BLOCK_COMMENT_MODE,
                s,
                c,
                i,
                {
                  begin: /\(/,
                  end: /\)/,
                  keywords: u,
                  relevance: 0,
                  contains: ["self", n, e2.C_BLOCK_COMMENT_MODE, s, c, i]
                }
              ]
            },
            i,
            n,
            e2.C_BLOCK_COMMENT_MODE,
            o
          ]
        };
        return {
          aliases: ["c", "cc", "h", "c++", "h++", "hpp", "hh", "hxx", "cxx"],
          keywords: u,
          disableAutodetect: true,
          illegal: "</",
          contains: [].concat(p, _, m, [
            o,
            {
              begin: "\\b(deque|list|queue|priority_queue|pair|stack|vector|map|set|bitset|multiset|multimap|unordered_map|unordered_set|unordered_multiset|unordered_multimap|array)\\s*<",
              end: ">",
              keywords: u,
              contains: ["self", i]
            },
            { begin: e2.IDENT_RE + "::", keywords: u },
            {
              className: "class",
              beginKeywords: "enum class struct union",
              end: /[{;:<>=]/,
              contains: [{ beginKeywords: "final class struct" }, e2.TITLE_MODE]
            }
          ]),
          exports: {
            preprocessor: o,
            strings: s,
            keywords: u
          }
        };
      })(e);
      return t.name = "C", t.aliases = ["c", "h"], t;
    };
  })()
);
hljs.registerLanguage(
  "makefile",
  (() => {
    return (e) => {
      const i = {
        className: "variable",
        variants: [
          {
            begin: "\\$\\(" + e.UNDERSCORE_IDENT_RE + "\\)",
            contains: [e.BACKSLASH_ESCAPE]
          },
          { begin: /\$[@%<?\^\+\*]/ }
        ]
      }, a = {
        className: "string",
        begin: /"/,
        end: /"/,
        contains: [e.BACKSLASH_ESCAPE, i]
      }, n = {
        className: "variable",
        begin: /\$\([\w-]+\s/,
        end: /\)/,
        keywords: {
          built_in: "subst patsubst strip findstring filter filter-out sort word wordlist firstword lastword dir notdir suffix basename addsuffix addprefix join wildcard realpath abspath error warning shell origin flavor foreach if or and call eval file value"
        },
        contains: [i]
      }, s = { begin: "^" + e.UNDERSCORE_IDENT_RE + "\\s*(?=[:+?]?=)" }, r = {
        className: "section",
        begin: /^[^\s]+:/,
        end: /$/,
        contains: [i]
      };
      return {
        name: "Makefile",
        aliases: ["mk", "mak"],
        keywords: {
          $pattern: /[\w-]+/,
          keyword: "define endef undefine ifdef ifndef ifeq ifneq else endif include -include sinclude override export unexport private vpath"
        },
        contains: [
          e.HASH_COMMENT_MODE,
          i,
          a,
          n,
          s,
          {
            className: "meta",
            begin: /^\.PHONY:/,
            end: /$/,
            keywords: { $pattern: /[\.\w]+/, "meta-keyword": ".PHONY" }
          },
          r
        ]
      };
    };
  })()
);
hljs.registerLanguage(
  "xml",
  (() => {
    function e(e2) {
      return e2 ? "string" == typeof e2 ? e2 : e2.source : null;
    }
    function n(e2) {
      return a("(?=", e2, ")");
    }
    function a(...n2) {
      return n2.map((n3) => e(n3)).join("");
    }
    function s(...n2) {
      return "(" + n2.map((n3) => e(n3)).join("|") + ")";
    }
    return (e2) => {
      const t = a(/[A-Z_]/, a("(", /[A-Z0-9_.-]+:/, ")?"), /[A-Z0-9_.-]*/), i = {
        className: "symbol",
        begin: "&[a-z]+;|&#[0-9]+;|&#x[a-f0-9]+;"
      }, c = {
        begin: "\\s",
        contains: [
          {
            className: "meta-keyword",
            begin: "#?[a-z_][a-z1-9_-]+",
            illegal: "\\n"
          }
        ]
      }, r = e2.inherit(c, { begin: "\\(", end: "\\)" }), l = e2.inherit(e2.APOS_STRING_MODE, {
        className: "meta-string"
      }), g = e2.inherit(e2.QUOTE_STRING_MODE, {
        className: "meta-string"
      }), m = {
        endsWithParent: true,
        illegal: /</,
        relevance: 0,
        contains: [
          { className: "attr", begin: "[A-Za-z0-9\\._:-]+", relevance: 0 },
          {
            begin: /=\s*/,
            relevance: 0,
            contains: [
              {
                className: "string",
                endsParent: true,
                variants: [
                  {
                    begin: /"/,
                    end: /"/,
                    contains: [i]
                  },
                  { begin: /'/, end: /'/, contains: [i] },
                  {
                    begin: /[^\s"'=<>`]+/
                  }
                ]
              }
            ]
          }
        ]
      };
      return {
        name: "HTML, XML",
        aliases: [
          "html",
          "xhtml",
          "rss",
          "atom",
          "xjb",
          "xsd",
          "xsl",
          "plist",
          "wsf",
          "svg"
        ],
        case_insensitive: true,
        contains: [
          {
            className: "meta",
            begin: "<![a-z]",
            end: ">",
            relevance: 10,
            contains: [
              c,
              g,
              l,
              r,
              {
                begin: "\\[",
                end: "\\]",
                contains: [
                  {
                    className: "meta",
                    begin: "<![a-z]",
                    end: ">",
                    contains: [c, r, g, l]
                  }
                ]
              }
            ]
          },
          e2.COMMENT("<!--", "-->", { relevance: 10 }),
          { begin: "<!\\[CDATA\\[", end: "\\]\\]>", relevance: 10 },
          i,
          { className: "meta", begin: /<\?xml/, end: /\?>/, relevance: 10 },
          {
            className: "tag",
            begin: "<style(?=\\s|>)",
            end: ">",
            keywords: {
              name: "style"
            },
            contains: [m],
            starts: {
              end: "</style>",
              returnEnd: true,
              subLanguage: ["css", "xml"]
            }
          },
          {
            className: "tag",
            begin: "<script(?=\\s|>)",
            end: ">",
            keywords: { name: "script" },
            contains: [m],
            starts: {
              end: /<\/script>/,
              returnEnd: true,
              subLanguage: ["javascript", "handlebars", "xml"]
            }
          },
          { className: "tag", begin: /<>|<\/>/ },
          {
            className: "tag",
            begin: a(/</, n(a(t, s(/\/>/, />/, /\s/)))),
            end: /\/?>/,
            contains: [
              {
                className: "name",
                begin: t,
                relevance: 0,
                starts: m
              }
            ]
          },
          {
            className: "tag",
            begin: a(/<\//, n(a(t, />/))),
            contains: [
              { className: "name", begin: t, relevance: 0 },
              {
                begin: />/,
                relevance: 0
              }
            ]
          }
        ]
      };
    };
  })()
);
hljs.registerLanguage(
  "bash",
  (() => {
    function e(...e2) {
      return e2.map((e3) => {
        return (s = e3) ? "string" == typeof s ? s : s.source : null;
        var s;
      }).join("");
    }
    return (s) => {
      const n = {}, t = {
        begin: /\$\{/,
        end: /\}/,
        contains: [
          "self",
          {
            begin: /:-/,
            contains: [n]
          }
        ]
      };
      Object.assign(n, {
        className: "variable",
        variants: [
          {
            begin: e(/\$[\w\d#@][\w\d_]*/, "(?![\\w\\d])(?![$])")
          },
          t
        ]
      });
      const a = {
        className: "subst",
        begin: /\$\(/,
        end: /\)/,
        contains: [s.BACKSLASH_ESCAPE]
      }, i = {
        begin: /<<-?\s*(?=\w+)/,
        starts: {
          contains: [
            s.END_SAME_AS_BEGIN({
              begin: /(\w+)/,
              end: /(\w+)/,
              className: "string"
            })
          ]
        }
      }, c = {
        className: "string",
        begin: /"/,
        end: /"/,
        contains: [s.BACKSLASH_ESCAPE, n, a]
      };
      a.contains.push(c);
      const o = {
        begin: /\$\(\(/,
        end: /\)\)/,
        contains: [
          { begin: /\d+#[0-9a-f]+/, className: "number" },
          s.NUMBER_MODE,
          n
        ]
      }, r = s.SHEBANG({
        binary: "(fish|bash|zsh|sh|csh|ksh|tcsh|dash|scsh)",
        relevance: 10
      }), l = {
        className: "function",
        begin: /\w[\w\d_]*\s*\(\s*\)\s*\{/,
        returnBegin: true,
        contains: [s.inherit(s.TITLE_MODE, { begin: /\w[\w\d_]*/ })],
        relevance: 0
      };
      return {
        name: "Bash",
        aliases: ["sh", "zsh"],
        keywords: {
          $pattern: /\b[a-z._-]+\b/,
          keyword: "if then else elif fi for while in do done case esac function",
          literal: "true false",
          built_in: "break cd continue eval exec exit export getopts hash pwd readonly return shift test times trap umask unset alias bind builtin caller command declare echo enable help let local logout mapfile printf read readarray source type typeset ulimit unalias set shopt autoload bg bindkey bye cap chdir clone comparguments compcall compctl compdescribe compfiles compgroups compquote comptags comptry compvalues dirs disable disown echotc echoti emulate fc fg float functions getcap getln history integer jobs kill limit log noglob popd print pushd pushln rehash sched setcap setopt stat suspend ttyctl unfunction unhash unlimit unsetopt vared wait whence where which zcompile zformat zftp zle zmodload zparseopts zprof zpty zregexparse zsocket zstyle ztcp"
        },
        contains: [
          r,
          s.SHEBANG(),
          l,
          o,
          s.HASH_COMMENT_MODE,
          i,
          c,
          { className: "", begin: /\\"/ },
          { className: "string", begin: /'/, end: /'/ },
          n
        ]
      };
    };
  })()
);
hljs.registerLanguage(
  "swift",
  (() => {
    return (e) => {
      var i = {
        $pattern: /[\w#]+/,
        keyword: "#available #colorLiteral #column #else #elseif #endif #file #fileLiteral #function #if #imageLiteral #line #selector #sourceLocation _ __COLUMN__ __FILE__ __FUNCTION__ __LINE__ Any as as! as? associatedtype associativity break case catch class continue convenience default defer deinit didSet do dynamic dynamicType else enum extension fallthrough false fileprivate final for func get guard if import in indirect infix init inout internal is lazy left let mutating nil none nonmutating open operator optional override postfix precedence prefix private protocol Protocol public repeat required rethrows return right self Self set some static struct subscript super switch throw throws true try try! try? Type typealias unowned var weak where while willSet",
        literal: "true false nil",
        built_in: "abs advance alignof alignofValue anyGenerator assert assertionFailure bridgeFromObjectiveC bridgeFromObjectiveCUnconditional bridgeToObjectiveC bridgeToObjectiveCUnconditional c compactMap contains count countElements countLeadingZeros debugPrint debugPrintln distance dropFirst dropLast dump encodeBitsAsWords enumerate equal fatalError filter find getBridgedObjectiveCType getVaList indices insertionSort isBridgedToObjectiveC isBridgedVerbatimToObjectiveC isUniquelyReferenced isUniquelyReferencedNonObjC join lazy lexicographicalCompare map max maxElement min minElement numericCast overlaps partition posix precondition preconditionFailure print println quickSort readLine reduce reflect reinterpretCast reverse roundUpToAlignment sizeof sizeofValue sort split startsWith stride strideof strideofValue swap toString transcode underestimateCount unsafeAddressOf unsafeBitCast unsafeDowncast unsafeUnwrap unsafeReflect withExtendedLifetime withObjectAtPlusZero withUnsafePointer withUnsafePointerToObject withUnsafeMutablePointer withUnsafeMutablePointers withUnsafePointer withUnsafePointers withVaList zip"
      }, n = e.COMMENT("/\\*", "\\*/", { contains: ["self"] }), t = {
        className: "subst",
        begin: /\\\(/,
        end: "\\)",
        keywords: i,
        contains: []
      }, a = {
        className: "string",
        contains: [e.BACKSLASH_ESCAPE, t],
        variants: [
          { begin: /"""/, end: /"""/ },
          { begin: /"/, end: /"/ }
        ]
      }, r = "([0-9a-fA-F]_*)+", s = {
        className: "number",
        relevance: 0,
        variants: [
          {
            begin: "\\b(([0-9]_*)+)(\\.(([0-9]_*)+))?([eE][+-]?(([0-9]_*)+))?\\b"
          },
          {
            begin: `\\b0x(${r})(\\.(${r}))?([pP][+-]?(([0-9]_*)+))?\\b`
          },
          {
            begin: /\b0o([0-7]_*)+\b/
          },
          { begin: /\b0b([01]_*)+\b/ }
        ]
      };
      return t.contains = [s], {
        name: "Swift",
        keywords: i,
        contains: [
          a,
          e.C_LINE_COMMENT_MODE,
          n,
          { className: "type", begin: "\\b[A-Z][\\w\xC0-\u02B8']*[!?]" },
          {
            className: "type",
            begin: "\\b[A-Z][\\w\xC0-\u02B8']*",
            relevance: 0
          },
          s,
          {
            className: "function",
            beginKeywords: "func",
            end: /\{/,
            excludeEnd: true,
            contains: [
              e.inherit(e.TITLE_MODE, {
                begin: /[A-Za-z$_][0-9A-Za-z$_]*/
              }),
              { begin: /</, end: />/ },
              {
                className: "params",
                begin: /\(/,
                end: /\)/,
                endsParent: true,
                keywords: i,
                contains: [
                  "self",
                  s,
                  a,
                  e.C_BLOCK_COMMENT_MODE,
                  { begin: ":" }
                ],
                illegal: /["']/
              }
            ],
            illegal: /\[|%/
          },
          {
            className: "class",
            beginKeywords: "struct protocol class extension enum",
            keywords: i,
            end: "\\{",
            excludeEnd: true,
            contains: [
              e.inherit(e.TITLE_MODE, {
                begin: /[A-Za-z$_][\u00C0-\u02B80-9A-Za-z$_]*/
              })
            ]
          },
          {
            className: "meta",
            begin: "(@discardableResult|@warn_unused_result|@exported|@lazy|@noescape|@NSCopying|@NSManaged|@objc|@objcMembers|@convention|@required|@noreturn|@IBAction|@IBDesignable|@IBInspectable|@IBOutlet|@infix|@prefix|@postfix|@autoclosure|@testable|@available|@nonobjc|@NSApplicationMain|@UIApplicationMain|@dynamicMemberLookup|@propertyWrapper|@main)\\b"
          },
          {
            beginKeywords: "import",
            end: /$/,
            contains: [e.C_LINE_COMMENT_MODE, n],
            relevance: 0
          }
        ]
      };
    };
  })()
);
hljs.registerLanguage(
  "python",
  (() => {
    return (e) => {
      const n = {
        keyword: "and as assert async await break class continue def del elif else except finally for  from global if import in is lambda nonlocal|10 not or pass raise return try while with yield",
        built_in: "__import__ abs all any ascii bin bool breakpoint bytearray bytes callable chr classmethod compile complex delattr dict dir divmod enumerate eval exec filter float format frozenset getattr globals hasattr hash help hex id input int isinstance issubclass iter len list locals map max memoryview min next object oct open ord pow print property range repr reversed round set setattr slice sorted staticmethod str sum super tuple type vars zip",
        literal: "__debug__ Ellipsis False None NotImplemented True"
      }, a = {
        className: "meta",
        begin: /^(>>>|\.\.\.) /
      }, s = {
        className: "subst",
        begin: /\{/,
        end: /\}/,
        keywords: n,
        illegal: /#/
      }, i = { begin: /\{\{/, relevance: 0 }, r = {
        className: "string",
        contains: [e.BACKSLASH_ESCAPE],
        variants: [
          {
            begin: /([uU]|[bB]|[rR]|[bB][rR]|[rR][bB])?'''/,
            end: /'''/,
            contains: [e.BACKSLASH_ESCAPE, a],
            relevance: 10
          },
          {
            begin: /([uU]|[bB]|[rR]|[bB][rR]|[rR][bB])?"""/,
            end: /"""/,
            contains: [e.BACKSLASH_ESCAPE, a],
            relevance: 10
          },
          {
            begin: /([fF][rR]|[rR][fF]|[fF])'''/,
            end: /'''/,
            contains: [e.BACKSLASH_ESCAPE, a, i, s]
          },
          {
            begin: /([fF][rR]|[rR][fF]|[fF])"""/,
            end: /"""/,
            contains: [e.BACKSLASH_ESCAPE, a, i, s]
          },
          { begin: /([uU]|[rR])'/, end: /'/, relevance: 10 },
          { begin: /([uU]|[rR])"/, end: /"/, relevance: 10 },
          {
            begin: /([bB]|[bB][rR]|[rR][bB])'/,
            end: /'/
          },
          { begin: /([bB]|[bB][rR]|[rR][bB])"/, end: /"/ },
          {
            begin: /([fF][rR]|[rR][fF]|[fF])'/,
            end: /'/,
            contains: [e.BACKSLASH_ESCAPE, i, s]
          },
          {
            begin: /([fF][rR]|[rR][fF]|[fF])"/,
            end: /"/,
            contains: [e.BACKSLASH_ESCAPE, i, s]
          },
          e.APOS_STRING_MODE,
          e.QUOTE_STRING_MODE
        ]
      }, t = "[0-9](_?[0-9])*", l = `(\\b(${t}))?\\.(${t})|\\b(${t})\\.`, b = {
        className: "number",
        relevance: 0,
        variants: [
          {
            begin: `(\\b(${t})|(${l}))[eE][+-]?(${t})[jJ]?\\b`
          },
          { begin: `(${l})[jJ]?` },
          {
            begin: "\\b([1-9](_?[0-9])*|0+(_?0)*)[lLjJ]?\\b"
          },
          {
            begin: "\\b0[bB](_?[01])+[lL]?\\b"
          },
          { begin: "\\b0[oO](_?[0-7])+[lL]?\\b" },
          {
            begin: "\\b0[xX](_?[0-9a-fA-F])+[lL]?\\b"
          },
          { begin: `\\b(${t})[jJ]\\b` }
        ]
      }, o = {
        className: "params",
        variants: [
          { begin: /\(\s*\)/, skip: true, className: null },
          {
            begin: /\(/,
            end: /\)/,
            excludeBegin: true,
            excludeEnd: true,
            keywords: n,
            contains: ["self", a, b, r, e.HASH_COMMENT_MODE]
          }
        ]
      };
      return s.contains = [r, b, a], {
        name: "Python",
        aliases: ["py", "gyp", "ipython"],
        keywords: n,
        illegal: /(<\/|->|\?)|=>/,
        contains: [
          a,
          b,
          { begin: /\bself\b/ },
          { beginKeywords: "if", relevance: 0 },
          r,
          e.HASH_COMMENT_MODE,
          {
            variants: [
              { className: "function", beginKeywords: "def" },
              { className: "class", beginKeywords: "class" }
            ],
            end: /:/,
            illegal: /[${=;\n,]/,
            contains: [
              e.UNDERSCORE_TITLE_MODE,
              o,
              { begin: /->/, endsWithParent: true, keywords: "None" }
            ]
          },
          {
            className: "meta",
            begin: /^[\t ]*@/,
            end: /(?=#)|$/,
            contains: [b, o, r]
          },
          { begin: /\b(print|exec)\(/ }
        ]
      };
    };
  })()
);
hljs.registerLanguage(
  "kotlin",
  (() => {
    return (e) => {
      const n = {
        keyword: "abstract as val var vararg get set class object open private protected public noinline crossinline dynamic final enum if else do while for when throw try catch finally import package is in fun override companion reified inline lateinit init interface annotation data sealed internal infix operator out by constructor super tailrec where const inner suspend typealias external expect actual",
        built_in: "Byte Short Char Int Long Boolean Float Double Void Unit Nothing",
        literal: "true false null"
      }, a = { className: "symbol", begin: e.UNDERSCORE_IDENT_RE + "@" }, s = {
        className: "subst",
        begin: /\$\{/,
        end: /\}/,
        contains: [e.C_NUMBER_MODE]
      }, i = {
        className: "variable",
        begin: "\\$" + e.UNDERSCORE_IDENT_RE
      }, t = {
        className: "string",
        variants: [
          { begin: '"""', end: '"""(?=[^"])', contains: [i, s] },
          {
            begin: "'",
            end: "'",
            illegal: /\n/,
            contains: [e.BACKSLASH_ESCAPE]
          },
          {
            begin: '"',
            end: '"',
            illegal: /\n/,
            contains: [e.BACKSLASH_ESCAPE, i, s]
          }
        ]
      };
      s.contains.push(t);
      const l = {
        className: "meta",
        begin: "@(?:file|property|field|get|set|receiver|param|setparam|delegate)\\s*:(?:\\s*" + e.UNDERSCORE_IDENT_RE + ")?"
      }, r = {
        className: "meta",
        begin: "@" + e.UNDERSCORE_IDENT_RE,
        contains: [
          {
            begin: /\(/,
            end: /\)/,
            contains: [e.inherit(t, { className: "meta-string" })]
          }
        ]
      }, c = e.COMMENT("/\\*", "\\*/", { contains: [e.C_BLOCK_COMMENT_MODE] }), o = {
        variants: [
          {
            className: "type",
            begin: e.UNDERSCORE_IDENT_RE
          },
          { begin: /\(/, end: /\)/, contains: [] }
        ]
      }, d = o;
      return d.variants[1].contains = [o], o.variants[1].contains = [d], {
        name: "Kotlin",
        aliases: ["kt"],
        keywords: n,
        contains: [
          e.COMMENT("/\\*\\*", "\\*/", {
            relevance: 0,
            contains: [{ className: "doctag", begin: "@[A-Za-z]+" }]
          }),
          e.C_LINE_COMMENT_MODE,
          c,
          {
            className: "keyword",
            begin: /\b(break|continue|return|this)\b/,
            starts: { contains: [{ className: "symbol", begin: /@\w+/ }] }
          },
          a,
          l,
          r,
          {
            className: "function",
            beginKeywords: "fun",
            end: "[(]|$",
            returnBegin: true,
            excludeEnd: true,
            keywords: n,
            illegal: /fun\s+(<.*>)?[^\s\(]+(\s+[^\s\(]+)\s*=/,
            relevance: 5,
            contains: [
              {
                begin: e.UNDERSCORE_IDENT_RE + "\\s*\\(",
                returnBegin: true,
                relevance: 0,
                contains: [e.UNDERSCORE_TITLE_MODE]
              },
              {
                className: "type",
                begin: /</,
                end: />/,
                keywords: "reified",
                relevance: 0
              },
              {
                className: "params",
                begin: /\(/,
                end: /\)/,
                endsParent: true,
                keywords: n,
                relevance: 0,
                contains: [
                  {
                    begin: /:/,
                    end: /[=,\/]/,
                    endsWithParent: true,
                    contains: [o, e.C_LINE_COMMENT_MODE, c],
                    relevance: 0
                  },
                  e.C_LINE_COMMENT_MODE,
                  c,
                  l,
                  r,
                  t,
                  e.C_NUMBER_MODE
                ]
              },
              c
            ]
          },
          {
            className: "class",
            beginKeywords: "class interface trait",
            end: /[:\{(]|$/,
            excludeEnd: true,
            illegal: "extends implements",
            contains: [
              {
                beginKeywords: "public protected internal private constructor"
              },
              e.UNDERSCORE_TITLE_MODE,
              {
                className: "type",
                begin: /</,
                end: />/,
                excludeBegin: true,
                excludeEnd: true,
                relevance: 0
              },
              {
                className: "type",
                begin: /[,:]\s*/,
                end: /[<\(,]|$/,
                excludeBegin: true,
                returnEnd: true
              },
              l,
              r
            ]
          },
          t,
          {
            className: "meta",
            begin: "^#!/usr/bin/env",
            end: "$",
            illegal: "\n"
          },
          {
            className: "number",
            begin: "\\b(0[bB]([01]+[01_]+[01]+|[01]+)|0[xX]([a-fA-F0-9]+[a-fA-F0-9_]+[a-fA-F0-9]+|[a-fA-F0-9]+)|(([\\d]+[\\d_]+[\\d]+|[\\d]+)(\\.([\\d]+[\\d_]+[\\d]+|[\\d]+))?|\\.([\\d]+[\\d_]+[\\d]+|[\\d]+))([eE][-+]?\\d+)?)[lLfF]?",
            relevance: 0
          }
        ]
      };
    };
  })()
);
hljs.registerLanguage(
  "scss",
  (() => {
    return (e) => {
      var t = "@[a-z-]+", i = {
        className: "variable",
        begin: "(\\$[a-zA-Z-][a-zA-Z0-9_-]*)\\b"
      }, r = {
        className: "number",
        begin: "#[0-9A-Fa-f]+"
      };
      return e.CSS_NUMBER_MODE, e.QUOTE_STRING_MODE, e.APOS_STRING_MODE, e.C_BLOCK_COMMENT_MODE, {
        name: "SCSS",
        case_insensitive: true,
        illegal: "[=/|']",
        contains: [
          e.C_LINE_COMMENT_MODE,
          e.C_BLOCK_COMMENT_MODE,
          {
            className: "selector-id",
            begin: "#[A-Za-z0-9_-]+",
            relevance: 0
          },
          {
            className: "selector-class",
            begin: "\\.[A-Za-z0-9_-]+",
            relevance: 0
          },
          {
            className: "selector-attr",
            begin: "\\[",
            end: "\\]",
            illegal: "$"
          },
          {
            className: "selector-tag",
            begin: "\\b(a|abbr|acronym|address|area|article|aside|audio|b|base|big|blockquote|body|br|button|canvas|caption|cite|code|col|colgroup|command|datalist|dd|del|details|dfn|div|dl|dt|em|embed|fieldset|figcaption|figure|footer|form|frame|frameset|(h[1-6])|head|header|hgroup|hr|html|i|iframe|img|input|ins|kbd|keygen|label|legend|li|link|map|mark|meta|meter|nav|noframes|noscript|object|ol|optgroup|option|output|p|param|pre|progress|q|rp|rt|ruby|samp|script|section|select|small|span|strike|strong|style|sub|sup|table|tbody|td|textarea|tfoot|th|thead|time|title|tr|tt|ul|var|video)\\b",
            relevance: 0
          },
          {
            className: "selector-pseudo",
            begin: ":(visited|valid|root|right|required|read-write|read-only|out-range|optional|only-of-type|only-child|nth-of-type|nth-last-of-type|nth-last-child|nth-child|not|link|left|last-of-type|last-child|lang|invalid|indeterminate|in-range|hover|focus|first-of-type|first-line|first-letter|first-child|first|enabled|empty|disabled|default|checked|before|after|active)"
          },
          {
            className: "selector-pseudo",
            begin: "::(after|before|choices|first-letter|first-line|repeat-index|repeat-item|selection|value)"
          },
          i,
          {
            className: "attribute",
            begin: "\\b(src|z-index|word-wrap|word-spacing|word-break|width|widows|white-space|visibility|vertical-align|unicode-bidi|transition-timing-function|transition-property|transition-duration|transition-delay|transition|transform-style|transform-origin|transform|top|text-underline-position|text-transform|text-shadow|text-rendering|text-overflow|text-indent|text-decoration-style|text-decoration-line|text-decoration-color|text-decoration|text-align-last|text-align|tab-size|table-layout|right|resize|quotes|position|pointer-events|perspective-origin|perspective|page-break-inside|page-break-before|page-break-after|padding-top|padding-right|padding-left|padding-bottom|padding|overflow-y|overflow-x|overflow-wrap|overflow|outline-width|outline-style|outline-offset|outline-color|outline|orphans|order|opacity|object-position|object-fit|normal|none|nav-up|nav-right|nav-left|nav-index|nav-down|min-width|min-height|max-width|max-height|mask|marks|margin-top|margin-right|margin-left|margin-bottom|margin|list-style-type|list-style-position|list-style-image|list-style|line-height|letter-spacing|left|justify-content|initial|inherit|ime-mode|image-orientation|image-resolution|image-rendering|icon|hyphens|height|font-weight|font-varix-ligatures|font-variant|font-style|font-stretch|font-size-adjust|font-size|font-language-override|font-kerning|font-feature-settings|font-family|font|float|flex-wrap|flex-shrink|flex-grow|flex-flow|flex-direction|flex-basis|flex|filter|empty-cells|display|direction|cursor|counter-reset|counter-increment|content|column-width|column-span|column-rule-width|column-rule-style|column-rule-color|column-rule|column-gap|column-fill|column-count|columns|color|clip-path|clip|clear|caption-side|break-inside|break-before|break-after|box-sizing|box-shadow|box-decoration-break|bottom|border-width|border-top-width|border-top-style|border-top-right-radius|border-top-left-radius|border-top-color|border-top|border-style|border-spacing|border-right-width|border-right-style|border-right-color|border-right|border-radius|border-left-width|border-left-style|border-left-color|border-left|border-image-width|border-image-source|border-image-slice|border-image-repeat|border-image-outset|border-image|border-color|border-collapse|border-bottom-width|border-bottom-style|border-bottom-right-radius|border-bottom-left-radius|border-bottom-color|border-bottom|border|background-size|background-repeat|background-position|background-origin|background-image|background-color|background-clip|background-attachment|background-blend-mode|background|backface-visibility|auto|animation-timing-function|animation-play-state|animation-name|animation-iteration-count|animation-fill-mode|animation-duration|animation-direction|animation-delay|animation|align-self|align-items|align-content)\\b",
            illegal: "[^\\s]"
          },
          {
            begin: "\\b(whitespace|wait|w-resize|visible|vertical-text|vertical-ideographic|uppercase|upper-roman|upper-alpha|underline|transparent|top|thin|thick|text|text-top|text-bottom|tb-rl|table-header-group|table-footer-group|sw-resize|super|strict|static|square|solid|small-caps|separate|se-resize|scroll|s-resize|rtl|row-resize|ridge|right|repeat|repeat-y|repeat-x|relative|progress|pointer|overline|outside|outset|oblique|nowrap|not-allowed|normal|none|nw-resize|no-repeat|no-drop|newspaper|ne-resize|n-resize|move|middle|medium|ltr|lr-tb|lowercase|lower-roman|lower-alpha|loose|list-item|line|line-through|line-edge|lighter|left|keep-all|justify|italic|inter-word|inter-ideograph|inside|inset|inline|inline-block|inherit|inactive|ideograph-space|ideograph-parenthesis|ideograph-numeric|ideograph-alpha|horizontal|hidden|help|hand|groove|fixed|ellipsis|e-resize|double|dotted|distribute|distribute-space|distribute-letter|distribute-all-lines|disc|disabled|default|decimal|dashed|crosshair|collapse|col-resize|circle|char|center|capitalize|break-word|break-all|bottom|both|bolder|bold|block|bidi-override|below|baseline|auto|always|all-scroll|absolute|table|table-cell)\\b"
          },
          {
            begin: ":",
            end: ";",
            contains: [
              i,
              r,
              e.CSS_NUMBER_MODE,
              e.QUOTE_STRING_MODE,
              e.APOS_STRING_MODE,
              {
                className: "meta",
                begin: "!important"
              }
            ]
          },
          {
            begin: "@(page|font-face)",
            lexemes: t,
            keywords: "@page @font-face"
          },
          {
            begin: "@",
            end: "[{;]",
            returnBegin: true,
            keywords: "and or not only",
            contains: [
              { begin: t, className: "keyword" },
              i,
              e.QUOTE_STRING_MODE,
              e.APOS_STRING_MODE,
              r,
              e.CSS_NUMBER_MODE
            ]
          }
        ]
      };
    };
  })()
);
hljs.registerLanguage(
  "yaml",
  (() => {
    return (e) => {
      var n = "true false yes no null", a = "[\\w#;/?:@&=+$,.~*'()[\\]]+", s = {
        className: "string",
        relevance: 0,
        variants: [
          { begin: /'/, end: /'/ },
          { begin: /"/, end: /"/ },
          { begin: /\S+/ }
        ],
        contains: [
          e.BACKSLASH_ESCAPE,
          {
            className: "template-variable",
            variants: [
              { begin: /\{\{/, end: /\}\}/ },
              { begin: /%\{/, end: /\}/ }
            ]
          }
        ]
      }, i = e.inherit(s, {
        variants: [
          { begin: /'/, end: /'/ },
          { begin: /"/, end: /"/ },
          { begin: /[^\s,{}[\]]+/ }
        ]
      }), l = {
        end: ",",
        endsWithParent: true,
        excludeEnd: true,
        contains: [],
        keywords: n,
        relevance: 0
      }, t = {
        begin: /\{/,
        end: /\}/,
        contains: [l],
        illegal: "\\n",
        relevance: 0
      }, g = {
        begin: "\\[",
        end: "\\]",
        contains: [l],
        illegal: "\\n",
        relevance: 0
      }, b = [
        {
          className: "attr",
          variants: [
            { begin: "\\w[\\w :\\/.-]*:(?=[ 	]|$)" },
            {
              begin: '"\\w[\\w :\\/.-]*":(?=[ 	]|$)'
            },
            { begin: "'\\w[\\w :\\/.-]*':(?=[ 	]|$)" }
          ]
        },
        { className: "meta", begin: "^---\\s*$", relevance: 10 },
        {
          className: "string",
          begin: "[\\|>]([1-9]?[+-])?[ ]*\\n( +)[^\\n]+\\n(\\2[^\\n]+\\n?)*"
        },
        {
          begin: "<%[%=-]?",
          end: "[%-]?%>",
          subLanguage: "ruby",
          excludeBegin: true,
          excludeEnd: true,
          relevance: 0
        },
        { className: "type", begin: "!\\w+!" + a },
        { className: "type", begin: "!<" + a + ">" },
        { className: "type", begin: "!" + a },
        { className: "type", begin: "!!" + a },
        { className: "meta", begin: "&" + e.UNDERSCORE_IDENT_RE + "$" },
        { className: "meta", begin: "\\*" + e.UNDERSCORE_IDENT_RE + "$" },
        { className: "bullet", begin: "-(?=[ ]|$)", relevance: 0 },
        e.HASH_COMMENT_MODE,
        { beginKeywords: n, keywords: { literal: n } },
        {
          className: "number",
          begin: "\\b[0-9]{4}(-[0-9][0-9]){0,2}([Tt \\t][0-9][0-9]?(:[0-9][0-9]){2})?(\\.[0-9]*)?([ \\t])*(Z|[-+][0-9][0-9]?(:[0-9][0-9])?)?\\b"
        },
        { className: "number", begin: e.C_NUMBER_RE + "\\b", relevance: 0 },
        t,
        g,
        s
      ], r = [...b];
      return r.pop(), r.push(i), l.contains = r, {
        name: "YAML",
        case_insensitive: true,
        aliases: ["yml", "YAML"],
        contains: b
      };
    };
  })()
);
hljs.registerLanguage(
  "markdown",
  (() => {
    function n(...n2) {
      return n2.map((n3) => {
        return (e = n3) ? "string" == typeof e ? e : e.source : null;
        var e;
      }).join("");
    }
    return (e) => {
      const a = {
        begin: /<\/?[A-Za-z_]/,
        end: ">",
        subLanguage: "xml",
        relevance: 0
      }, i = {
        variants: [
          { begin: /\[.+?\]\[.*?\]/, relevance: 0 },
          {
            begin: /\[.+?\]\(((data|javascript|mailto):|(?:http|ftp)s?:\/\/).*?\)/,
            relevance: 2
          },
          {
            begin: n(/\[.+?\]\(/, /[A-Za-z][A-Za-z0-9+.-]*/, /:\/\/.*?\)/),
            relevance: 2
          },
          { begin: /\[.+?\]\([./?&#].*?\)/, relevance: 1 },
          {
            begin: /\[.+?\]\(.*?\)/,
            relevance: 0
          }
        ],
        returnBegin: true,
        contains: [
          {
            className: "string",
            relevance: 0,
            begin: "\\[",
            end: "\\]",
            excludeBegin: true,
            returnEnd: true
          },
          {
            className: "link",
            relevance: 0,
            begin: "\\]\\(",
            end: "\\)",
            excludeBegin: true,
            excludeEnd: true
          },
          {
            className: "symbol",
            relevance: 0,
            begin: "\\]\\[",
            end: "\\]",
            excludeBegin: true,
            excludeEnd: true
          }
        ]
      }, s = {
        className: "strong",
        contains: [],
        variants: [
          { begin: /_{2}/, end: /_{2}/ },
          { begin: /\*{2}/, end: /\*{2}/ }
        ]
      }, c = {
        className: "emphasis",
        contains: [],
        variants: [
          { begin: /\*(?!\*)/, end: /\*/ },
          {
            begin: /_(?!_)/,
            end: /_/,
            relevance: 0
          }
        ]
      };
      s.contains.push(c), c.contains.push(s);
      let t = [a, i];
      return s.contains = s.contains.concat(t), c.contains = c.contains.concat(t), t = t.concat(s, c), {
        name: "Markdown",
        aliases: ["md", "mkdown", "mkd"],
        contains: [
          {
            className: "section",
            variants: [
              { begin: "^#{1,6}", end: "$", contains: t },
              {
                begin: "(?=^.+?\\n[=-]{2,}$)",
                contains: [
                  { begin: "^[=-]*$" },
                  { begin: "^", end: "\\n", contains: t }
                ]
              }
            ]
          },
          a,
          {
            className: "bullet",
            begin: "^[ 	]*([*+-]|(\\d+\\.))(?=\\s+)",
            end: "\\s+",
            excludeEnd: true
          },
          s,
          c,
          { className: "quote", begin: "^>\\s+", contains: t, end: "$" },
          {
            className: "code",
            variants: [
              { begin: "(`{3,})(.|\\n)*?\\1`*[ ]*" },
              {
                begin: "(~{3,})(.|\\n)*?\\1~*[ ]*"
              },
              { begin: "```", end: "```+[ ]*$" },
              { begin: "~~~", end: "~~~+[ ]*$" },
              { begin: "`.+?`" },
              {
                begin: "(?=^( {4}|\\t))",
                contains: [
                  {
                    begin: "^( {4}|\\t)",
                    end: "(\\n)$"
                  }
                ],
                relevance: 0
              }
            ]
          },
          { begin: "^[-\\*]{3,}", end: "$" },
          i,
          {
            begin: /^\[[^\n]+\]:/,
            returnBegin: true,
            contains: [
              {
                className: "symbol",
                begin: /\[/,
                end: /\]/,
                excludeBegin: true,
                excludeEnd: true
              },
              { className: "link", begin: /:\s*/, end: /$/, excludeBegin: true }
            ]
          }
        ]
      };
    };
  })()
);
hljs.registerLanguage(
  "lua",
  (() => {
    return (e) => {
      const t = "\\[=*\\[", a = "\\]=*\\]", n = { begin: t, end: a, contains: ["self"] }, o = [
        e.COMMENT("--(?!\\[=*\\[)", "$"),
        e.COMMENT("--\\[=*\\[", a, { contains: [n], relevance: 10 })
      ];
      return {
        name: "Lua",
        keywords: {
          $pattern: e.UNDERSCORE_IDENT_RE,
          literal: "true false nil",
          keyword: "and break do else elseif end for goto if in local not or repeat return then until while",
          built_in: "_G _ENV _VERSION __index __newindex __mode __call __metatable __tostring __len __gc __add __sub __mul __div __mod __pow __concat __unm __eq __lt __le assert collectgarbage dofile error getfenv getmetatable ipairs load loadfile loadstring module next pairs pcall print rawequal rawget rawset require select setfenv setmetatable tonumber tostring type unpack xpcall arg self coroutine resume yield status wrap create running debug getupvalue debug sethook getmetatable gethook setmetatable setlocal traceback setfenv getinfo setupvalue getlocal getregistry getfenv io lines write close flush open output type read stderr stdin input stdout popen tmpfile math log max acos huge ldexp pi cos tanh pow deg tan cosh sinh random randomseed frexp ceil floor rad abs sqrt modf asin min mod fmod log10 atan2 exp sin atan os exit setlocale date getenv difftime remove time clock tmpname rename execute package preload loadlib loaded loaders cpath config path seeall string sub upper len gfind rep find match char dump gmatch reverse byte format gsub lower table setn insert getn foreachi maxn foreach concat sort remove"
        },
        contains: o.concat([
          {
            className: "function",
            beginKeywords: "function",
            end: "\\)",
            contains: [
              e.inherit(e.TITLE_MODE, {
                begin: "([_a-zA-Z]\\w*\\.)*([_a-zA-Z]\\w*:)?[_a-zA-Z]\\w*"
              }),
              {
                className: "params",
                begin: "\\(",
                endsWithParent: true,
                contains: o
              }
            ].concat(o)
          },
          e.C_NUMBER_MODE,
          e.APOS_STRING_MODE,
          e.QUOTE_STRING_MODE,
          { className: "string", begin: t, end: a, contains: [n], relevance: 5 }
        ])
      };
    };
  })()
);
hljs.registerLanguage(
  "go",
  (() => {
    return (e) => {
      const n = {
        keyword: "break default func interface select case map struct chan else goto package switch const fallthrough if range type continue for import return var go defer bool byte complex64 complex128 float32 float64 int8 int16 int32 int64 string uint8 uint16 uint32 uint64 int uint uintptr rune",
        literal: "true false iota nil",
        built_in: "append cap close complex copy imag len make new panic print println real recover delete"
      };
      return {
        name: "Go",
        aliases: ["golang"],
        keywords: n,
        illegal: "</",
        contains: [
          e.C_LINE_COMMENT_MODE,
          e.C_BLOCK_COMMENT_MODE,
          {
            className: "string",
            variants: [
              e.QUOTE_STRING_MODE,
              e.APOS_STRING_MODE,
              { begin: "`", end: "`" }
            ]
          },
          {
            className: "number",
            variants: [
              { begin: e.C_NUMBER_RE + "[i]", relevance: 1 },
              e.C_NUMBER_MODE
            ]
          },
          { begin: /:=/ },
          {
            className: "function",
            beginKeywords: "func",
            end: "\\s*(\\{|$)",
            excludeEnd: true,
            contains: [
              e.TITLE_MODE,
              {
                className: "params",
                begin: /\(/,
                end: /\)/,
                keywords: n,
                illegal: /["']/
              }
            ]
          }
        ]
      };
    };
  })()
);
hljs.registerLanguage(
  "properties",
  (() => {
    return (e) => {
      var n = "[ \\t\\f]*", a = n + "[:=]" + n, t = "(" + a + "|[ \\t\\f]+)", r = "([^\\\\\\W:= \\t\\f\\n]|\\\\.)+", s = "([^\\\\:= \\t\\f\\n]|\\\\.)+", i = {
        end: t,
        relevance: 0,
        starts: {
          className: "string",
          end: /$/,
          relevance: 0,
          contains: [
            {
              begin: "\\\\\\n"
            }
          ]
        }
      };
      return {
        name: ".properties",
        case_insensitive: true,
        illegal: /\S/,
        contains: [
          e.COMMENT("^\\s*[!#]", "$"),
          {
            returnBegin: true,
            variants: [
              { begin: r + a, relevance: 1 },
              { begin: r + "[ \\t\\f]+", relevance: 0 }
            ],
            contains: [
              { className: "attr", begin: r, endsParent: true, relevance: 0 }
            ],
            starts: i
          },
          {
            begin: s + t,
            returnBegin: true,
            relevance: 0,
            contains: [
              { className: "meta", begin: s, endsParent: true, relevance: 0 }
            ],
            starts: i
          },
          { className: "attr", relevance: 0, begin: s + n + "$" }
        ]
      };
    };
  })()
);
hljs.registerLanguage(
  "diff",
  (() => {
    return (e) => ({
      name: "Diff",
      aliases: ["patch"],
      contains: [
        {
          className: "meta",
          relevance: 10,
          variants: [
            {
              begin: /^@@ +-\d+,\d+ +\+\d+,\d+ +@@/
            },
            { begin: /^\*\*\* +\d+,\d+ +\*\*\*\*$/ },
            {
              begin: /^--- +\d+,\d+ +----$/
            }
          ]
        },
        {
          className: "comment",
          variants: [
            { begin: /Index: /, end: /$/ },
            { begin: /^index/, end: /$/ },
            { begin: /={3,}/, end: /$/ },
            { begin: /^-{3}/, end: /$/ },
            { begin: /^\*{3} /, end: /$/ },
            { begin: /^\+{3}/, end: /$/ },
            { begin: /^\*{15}$/ },
            {
              begin: /^diff --git/,
              end: /$/
            }
          ]
        },
        { className: "addition", begin: /^\+/, end: /$/ },
        {
          className: "deletion",
          begin: /^-/,
          end: /$/
        },
        { className: "addition", begin: /^!/, end: /$/ }
      ]
    });
  })()
);
hljs.registerLanguage(
  "javascript",
  (() => {
    const e = "[A-Za-z$_][0-9A-Za-z$_]*", n = [
      "as",
      "in",
      "of",
      "if",
      "for",
      "while",
      "finally",
      "var",
      "new",
      "function",
      "do",
      "return",
      "void",
      "else",
      "break",
      "catch",
      "instanceof",
      "with",
      "throw",
      "case",
      "default",
      "try",
      "switch",
      "continue",
      "typeof",
      "delete",
      "let",
      "yield",
      "const",
      "class",
      "debugger",
      "async",
      "await",
      "static",
      "import",
      "from",
      "export",
      "extends"
    ], a = ["true", "false", "null", "undefined", "NaN", "Infinity"], s = [].concat(
      [
        "setInterval",
        "setTimeout",
        "clearInterval",
        "clearTimeout",
        "require",
        "exports",
        "eval",
        "isFinite",
        "isNaN",
        "parseFloat",
        "parseInt",
        "decodeURI",
        "decodeURIComponent",
        "encodeURI",
        "encodeURIComponent",
        "escape",
        "unescape"
      ],
      [
        "arguments",
        "this",
        "super",
        "console",
        "window",
        "document",
        "localStorage",
        "module",
        "global"
      ],
      [
        "Intl",
        "DataView",
        "Number",
        "Math",
        "Date",
        "String",
        "RegExp",
        "Object",
        "Function",
        "Boolean",
        "Error",
        "Symbol",
        "Set",
        "Map",
        "WeakSet",
        "WeakMap",
        "Proxy",
        "Reflect",
        "JSON",
        "Promise",
        "Float64Array",
        "Int16Array",
        "Int32Array",
        "Int8Array",
        "Uint16Array",
        "Uint32Array",
        "Float32Array",
        "Array",
        "Uint8Array",
        "Uint8ClampedArray",
        "ArrayBuffer"
      ],
      [
        "EvalError",
        "InternalError",
        "RangeError",
        "ReferenceError",
        "SyntaxError",
        "TypeError",
        "URIError"
      ]
    );
    function r(e2) {
      return i("(?=", e2, ")");
    }
    function i(...e2) {
      return e2.map((e3) => {
        return (n2 = e3) ? "string" == typeof n2 ? n2 : n2.source : null;
        var n2;
      }).join("");
    }
    return (t) => {
      const c = e, o = {
        begin: /<[A-Za-z0-9\\._:-]+/,
        end: /\/[A-Za-z0-9\\._:-]+>|\/>/,
        isTrulyOpeningTag: (e2, n2) => {
          const a2 = e2[0].length + e2.index, s2 = e2.input[a2];
          "<" !== s2 ? ">" === s2 && (((e3, { after: n3 }) => {
            const a3 = "</" + e3[0].slice(1);
            return -1 !== e3.input.indexOf(a3, n3);
          })(e2, { after: a2 }) || n2.ignoreMatch()) : n2.ignoreMatch();
        }
      }, l = {
        $pattern: e,
        keyword: n.join(" "),
        literal: a.join(" "),
        built_in: s.join(" ")
      }, b = "\\.([0-9](_?[0-9])*)", g = "0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*", d = {
        className: "number",
        variants: [
          {
            begin: `(\\b(${g})((${b})|\\.)?|(${b}))[eE][+-]?([0-9](_?[0-9])*)\\b`
          },
          {
            begin: `\\b(${g})\\b((${b})\\b|\\.)?|(${b})\\b`
          },
          {
            begin: "\\b(0|[1-9](_?[0-9])*)n\\b"
          },
          {
            begin: "\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b"
          },
          {
            begin: "\\b0[bB][0-1](_?[0-1])*n?\\b"
          },
          { begin: "\\b0[oO][0-7](_?[0-7])*n?\\b" },
          {
            begin: "\\b0[0-7]+n?\\b"
          }
        ],
        relevance: 0
      }, E = {
        className: "subst",
        begin: "\\$\\{",
        end: "\\}",
        keywords: l,
        contains: []
      }, u = {
        begin: "html`",
        end: "",
        starts: {
          end: "`",
          returnEnd: false,
          contains: [t.BACKSLASH_ESCAPE, E],
          subLanguage: "xml"
        }
      }, _ = {
        begin: "css`",
        end: "",
        starts: {
          end: "`",
          returnEnd: false,
          contains: [t.BACKSLASH_ESCAPE, E],
          subLanguage: "css"
        }
      }, m = {
        className: "string",
        begin: "`",
        end: "`",
        contains: [t.BACKSLASH_ESCAPE, E]
      }, N = {
        className: "comment",
        variants: [
          t.COMMENT("/\\*\\*", "\\*/", {
            relevance: 0,
            contains: [
              {
                className: "doctag",
                begin: "@[A-Za-z]+",
                contains: [
                  {
                    className: "type",
                    begin: "\\{",
                    end: "\\}",
                    relevance: 0
                  },
                  {
                    className: "variable",
                    begin: c + "(?=\\s*(-)|$)",
                    endsParent: true,
                    relevance: 0
                  },
                  {
                    begin: /(?=[^\n])\s/,
                    relevance: 0
                  }
                ]
              }
            ]
          }),
          t.C_BLOCK_COMMENT_MODE,
          t.C_LINE_COMMENT_MODE
        ]
      }, y = [
        t.APOS_STRING_MODE,
        t.QUOTE_STRING_MODE,
        u,
        _,
        m,
        d,
        t.REGEXP_MODE
      ];
      E.contains = y.concat({
        begin: /\{/,
        end: /\}/,
        keywords: l,
        contains: ["self"].concat(y)
      });
      const f = [].concat(N, E.contains), A = f.concat([
        { begin: /\(/, end: /\)/, keywords: l, contains: ["self"].concat(f) }
      ]), p = {
        className: "params",
        begin: /\(/,
        end: /\)/,
        excludeBegin: true,
        excludeEnd: true,
        keywords: l,
        contains: A
      };
      return {
        name: "Javascript",
        aliases: ["js", "jsx", "mjs", "cjs"],
        keywords: l,
        exports: { PARAMS_CONTAINS: A },
        illegal: /#(?![$_A-z])/,
        contains: [
          t.SHEBANG({ label: "shebang", binary: "node", relevance: 5 }),
          {
            label: "use_strict",
            className: "meta",
            relevance: 10,
            begin: /^\s*['"]use (strict|asm)['"]/
          },
          t.APOS_STRING_MODE,
          t.QUOTE_STRING_MODE,
          u,
          _,
          m,
          N,
          d,
          {
            begin: i(
              /[{,\n]\s*/,
              r(i(/(((\/\/.*$)|(\/\*(\*[^/]|[^*])*\*\/))\s*)*/, c + "\\s*:"))
            ),
            relevance: 0,
            contains: [
              { className: "attr", begin: c + r("\\s*:"), relevance: 0 }
            ]
          },
          {
            begin: "(" + t.RE_STARTERS_RE + "|\\b(case|return|throw)\\b)\\s*",
            keywords: "return throw case",
            contains: [
              N,
              t.REGEXP_MODE,
              {
                className: "function",
                begin: "(\\([^()]*(\\([^()]*(\\([^()]*\\))*[^()]*\\))*[^()]*\\)|" + t.UNDERSCORE_IDENT_RE + ")\\s*=>",
                returnBegin: true,
                end: "\\s*=>",
                contains: [
                  {
                    className: "params",
                    variants: [
                      {
                        begin: t.UNDERSCORE_IDENT_RE,
                        relevance: 0
                      },
                      { className: null, begin: /\(\s*\)/, skip: true },
                      {
                        begin: /\(/,
                        end: /\)/,
                        excludeBegin: true,
                        excludeEnd: true,
                        keywords: l,
                        contains: A
                      }
                    ]
                  }
                ]
              },
              { begin: /,/, relevance: 0 },
              { className: "", begin: /\s/, end: /\s*/, skip: true },
              {
                variants: [
                  { begin: "<>", end: "</>" },
                  {
                    begin: o.begin,
                    "on:begin": o.isTrulyOpeningTag,
                    end: o.end
                  }
                ],
                subLanguage: "xml",
                contains: [
                  { begin: o.begin, end: o.end, skip: true, contains: ["self"] }
                ]
              }
            ],
            relevance: 0
          },
          {
            className: "function",
            beginKeywords: "function",
            end: /[{;]/,
            excludeEnd: true,
            keywords: l,
            contains: ["self", t.inherit(t.TITLE_MODE, { begin: c }), p],
            illegal: /%/
          },
          {
            beginKeywords: "while if switch catch for"
          },
          {
            className: "function",
            begin: t.UNDERSCORE_IDENT_RE + "\\([^()]*(\\([^()]*(\\([^()]*\\))*[^()]*\\))*[^()]*\\)\\s*\\{",
            returnBegin: true,
            contains: [p, t.inherit(t.TITLE_MODE, { begin: c })]
          },
          {
            variants: [
              {
                begin: "\\." + c
              },
              { begin: "\\$" + c }
            ],
            relevance: 0
          },
          {
            className: "class",
            beginKeywords: "class",
            end: /[{;=]/,
            excludeEnd: true,
            illegal: /[:"[\]]/,
            contains: [
              {
                beginKeywords: "extends"
              },
              t.UNDERSCORE_TITLE_MODE
            ]
          },
          {
            begin: /\b(?=constructor)/,
            end: /[{;]/,
            excludeEnd: true,
            contains: [t.inherit(t.TITLE_MODE, { begin: c }), "self", p]
          },
          {
            begin: "(get|set)\\s+(?=" + c + "\\()",
            end: /\{/,
            keywords: "get set",
            contains: [
              t.inherit(t.TITLE_MODE, { begin: c }),
              { begin: /\(\)/ },
              p
            ]
          },
          { begin: /\$[(.]/ }
        ]
      };
    };
  })()
);
hljs.registerLanguage(
  "perl",
  (() => {
    function e(...e2) {
      return e2.map((e3) => {
        return (n = e3) ? "string" == typeof n ? n : n.source : null;
        var n;
      }).join("");
    }
    return (n) => {
      var t = {
        $pattern: /[\w.]+/,
        keyword: "getpwent getservent quotemeta msgrcv scalar kill dbmclose undef lc ma syswrite tr send umask sysopen shmwrite vec qx utime local oct semctl localtime readpipe do return format read sprintf dbmopen pop getpgrp not getpwnam rewinddir qq fileno qw endprotoent wait sethostent bless s|0 opendir continue each sleep endgrent shutdown dump chomp connect getsockname die socketpair close flock exists index shmget sub for endpwent redo lstat msgctl setpgrp abs exit select print ref gethostbyaddr unshift fcntl syscall goto getnetbyaddr join gmtime symlink semget splice x|0 getpeername recv log setsockopt cos last reverse gethostbyname getgrnam study formline endhostent times chop length gethostent getnetent pack getprotoent getservbyname rand mkdir pos chmod y|0 substr endnetent printf next open msgsnd readdir use unlink getsockopt getpriority rindex wantarray hex system getservbyport endservent int chr untie rmdir prototype tell listen fork shmread ucfirst setprotoent else sysseek link getgrgid shmctl waitpid unpack getnetbyname reset chdir grep split require caller lcfirst until warn while values shift telldir getpwuid my getprotobynumber delete and sort uc defined srand accept package seekdir getprotobyname semop our rename seek if q|0 chroot sysread setpwent no crypt getc chown sqrt write setnetent setpriority foreach tie sin msgget map stat getlogin unless elsif truncate exec keys glob tied closedir ioctl socket readlink eval xor readline binmode setservent eof ord bind alarm pipe atan2 getgrent exp time push setgrent gt lt or ne m|0 break given say state when"
      }, s = { className: "subst", begin: "[$@]\\{", end: "\\}", keywords: t }, r = { begin: /->\{/, end: /\}/ }, i = {
        variants: [
          { begin: /\$\d/ },
          {
            begin: e(
              /[$%@](\^\w\b|#\w+(::\w+)*|\{\w+\}|\w+(::\w*)*)/,
              "(?![A-Za-z])(?![@$%])"
            )
          },
          { begin: /[$%@][^\s\w{]/, relevance: 0 }
        ]
      }, a = [n.BACKSLASH_ESCAPE, s, i], o = [
        i,
        n.HASH_COMMENT_MODE,
        n.COMMENT(/^=\w/, /=cut/, {
          endsWithParent: true
        }),
        r,
        {
          className: "string",
          contains: a,
          variants: [
            {
              begin: "q[qwxr]?\\s*\\(",
              end: "\\)",
              relevance: 5
            },
            { begin: "q[qwxr]?\\s*\\[", end: "\\]", relevance: 5 },
            { begin: "q[qwxr]?\\s*\\{", end: "\\}", relevance: 5 },
            {
              begin: "q[qwxr]?\\s*\\|",
              end: "\\|",
              relevance: 5
            },
            { begin: "q[qwxr]?\\s*<", end: ">", relevance: 5 },
            { begin: "qw\\s+q", end: "q", relevance: 5 },
            { begin: "'", end: "'", contains: [n.BACKSLASH_ESCAPE] },
            { begin: '"', end: '"' },
            { begin: "`", end: "`", contains: [n.BACKSLASH_ESCAPE] },
            { begin: /\{\w+\}/, contains: [], relevance: 0 },
            {
              begin: "-?\\w+\\s*=>",
              contains: [],
              relevance: 0
            }
          ]
        },
        {
          className: "number",
          begin: "(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b",
          relevance: 0
        },
        {
          begin: "(\\/\\/|" + n.RE_STARTERS_RE + "|\\b(split|return|print|reverse|grep)\\b)\\s*",
          keywords: "split return print reverse grep",
          relevance: 0,
          contains: [
            n.HASH_COMMENT_MODE,
            {
              className: "regexp",
              begin: "(s|tr|y)/(\\\\.|[^/])*/(\\\\.|[^/])*/[a-z]*",
              relevance: 10
            },
            {
              className: "regexp",
              begin: "(m|qr)?/",
              end: "/[a-z]*",
              contains: [n.BACKSLASH_ESCAPE],
              relevance: 0
            }
          ]
        },
        {
          className: "function",
          beginKeywords: "sub",
          end: "(\\s*\\(.*?\\))?[;{]",
          excludeEnd: true,
          relevance: 5,
          contains: [n.TITLE_MODE]
        },
        {
          begin: "-\\w\\b",
          relevance: 0
        },
        {
          begin: "^__DATA__$",
          end: "^__END__$",
          subLanguage: "mojolicious",
          contains: [{ begin: "^@@.*", end: "$", className: "comment" }]
        }
      ];
      return s.contains = o, r.contains = o, { name: "Perl", aliases: ["pl", "pm"], keywords: t, contains: o };
    };
  })()
);
hljs.registerLanguage(
  "plaintext",
  (() => {
    return (t) => ({
      name: "Plain text",
      aliases: ["text", "txt"],
      disableAutodetect: true
    });
  })()
);
hljs.registerLanguage(
  "ini",
  (() => {
    function e(e2) {
      return e2 ? "string" == typeof e2 ? e2 : e2.source : null;
    }
    function n(...n2) {
      return n2.map((n3) => e(n3)).join("");
    }
    return (s) => {
      const a = {
        className: "number",
        relevance: 0,
        variants: [{ begin: /([+-]+)?[\d]+_[\d_]+/ }, { begin: s.NUMBER_RE }]
      }, i = s.COMMENT();
      i.variants = [
        { begin: /;/, end: /$/ },
        { begin: /#/, end: /$/ }
      ];
      const t = {
        className: "variable",
        variants: [{ begin: /\$[\w\d"][\w\d_]*/ }, { begin: /\$\{(.*?)\}/ }]
      }, r = { className: "literal", begin: /\bon|off|true|false|yes|no\b/ }, l = {
        className: "string",
        contains: [s.BACKSLASH_ESCAPE],
        variants: [
          { begin: "'''", end: "'''", relevance: 10 },
          { begin: '"""', end: '"""', relevance: 10 },
          { begin: '"', end: '"' },
          { begin: "'", end: "'" }
        ]
      }, c = {
        begin: /\[/,
        end: /\]/,
        contains: [i, r, t, l, a, "self"],
        relevance: 0
      }, g = "(" + [/[A-Za-z0-9_-]+/, /"(\\"|[^"])*"/, /'[^']*'/].map((n2) => e(n2)).join("|") + ")";
      return {
        name: "TOML, also INI",
        aliases: ["toml"],
        case_insensitive: true,
        illegal: /\S/,
        contains: [
          i,
          { className: "section", begin: /\[+/, end: /\]+/ },
          {
            begin: n(
              g,
              "(\\s*\\.\\s*",
              g,
              ")*",
              n("(?=", /\s*=\s*[^#\s]/, ")")
            ),
            className: "attr",
            starts: { end: /$/, contains: [i, c, r, t, l, a] }
          }
        ]
      };
    };
  })()
);
hljs.registerLanguage(
  "sql",
  (() => {
    return (e) => {
      var t = e.COMMENT("--", "$");
      return {
        name: "SQL",
        case_insensitive: true,
        illegal: /[<>{}*]/,
        contains: [
          {
            beginKeywords: "begin end start commit rollback savepoint lock alter create drop rename call delete do handler insert load replace select truncate update set show pragma grant merge describe use explain help declare prepare execute deallocate release unlock purge reset change stop analyze cache flush optimize repair kill install uninstall checksum restore check backup revoke comment values with",
            end: /;/,
            endsWithParent: true,
            keywords: {
              $pattern: /[\w\.]+/,
              keyword: "as abort abs absolute acc acce accep accept access accessed accessible account acos action activate add addtime admin administer advanced advise aes_decrypt aes_encrypt after agent aggregate ali alia alias all allocate allow alter always analyze ancillary and anti any anydata anydataset anyschema anytype apply archive archived archivelog are as asc ascii asin assembly assertion associate asynchronous at atan atn2 attr attri attrib attribu attribut attribute attributes audit authenticated authentication authid authors auto autoallocate autodblink autoextend automatic availability avg backup badfile basicfile before begin beginning benchmark between bfile bfile_base big bigfile bin binary_double binary_float binlog bit_and bit_count bit_length bit_or bit_xor bitmap blob_base block blocksize body both bound bucket buffer_cache buffer_pool build bulk by byte byteordermark bytes cache caching call calling cancel capacity cascade cascaded case cast catalog category ceil ceiling chain change changed char_base char_length character_length characters characterset charindex charset charsetform charsetid check checksum checksum_agg child choose chr chunk class cleanup clear client clob clob_base clone close cluster_id cluster_probability cluster_set clustering coalesce coercibility col collate collation collect colu colum column column_value columns columns_updated comment commit compact compatibility compiled complete composite_limit compound compress compute concat concat_ws concurrent confirm conn connec connect connect_by_iscycle connect_by_isleaf connect_by_root connect_time connection consider consistent constant constraint constraints constructor container content contents context contributors controlfile conv convert convert_tz corr corr_k corr_s corresponding corruption cos cost count count_big counted covar_pop covar_samp cpu_per_call cpu_per_session crc32 create creation critical cross cube cume_dist curdate current current_date current_time current_timestamp current_user cursor curtime customdatum cycle data database databases datafile datafiles datalength date_add date_cache date_format date_sub dateadd datediff datefromparts datename datepart datetime2fromparts day day_to_second dayname dayofmonth dayofweek dayofyear days db_role_change dbtimezone ddl deallocate declare decode decompose decrement decrypt deduplicate def defa defau defaul default defaults deferred defi defin define degrees delayed delegate delete delete_all delimited demand dense_rank depth dequeue des_decrypt des_encrypt des_key_file desc descr descri describ describe descriptor deterministic diagnostics difference dimension direct_load directory disable disable_all disallow disassociate discardfile disconnect diskgroup distinct distinctrow distribute distributed div do document domain dotnet double downgrade drop dumpfile duplicate duration each edition editionable editions element ellipsis else elsif elt empty enable enable_all enclosed encode encoding encrypt end end-exec endian enforced engine engines enqueue enterprise entityescaping eomonth error errors escaped evalname evaluate event eventdata events except exception exceptions exchange exclude excluding execu execut execute exempt exists exit exp expire explain explode export export_set extended extent external external_1 external_2 externally extract failed failed_login_attempts failover failure far fast feature_set feature_value fetch field fields file file_name_convert filesystem_like_logging final finish first first_value fixed flash_cache flashback floor flush following follows for forall force foreign form forma format found found_rows freelist freelists freepools fresh from from_base64 from_days ftp full function general generated get get_format get_lock getdate getutcdate global global_name globally go goto grant grants greatest group group_concat group_id grouping grouping_id groups gtid_subtract guarantee guard handler hash hashkeys having hea head headi headin heading heap help hex hierarchy high high_priority hosts hour hours http id ident_current ident_incr ident_seed identified identity idle_time if ifnull ignore iif ilike ilm immediate import in include including increment index indexes indexing indextype indicator indices inet6_aton inet6_ntoa inet_aton inet_ntoa infile initial initialized initially initrans inmemory inner innodb input insert install instance instantiable instr interface interleaved intersect into invalidate invisible is is_free_lock is_ipv4 is_ipv4_compat is_not is_not_null is_used_lock isdate isnull isolation iterate java join json json_exists keep keep_duplicates key keys kill language large last last_day last_insert_id last_value lateral lax lcase lead leading least leaves left len lenght length less level levels library like like2 like4 likec limit lines link list listagg little ln load load_file lob lobs local localtime localtimestamp locate locator lock locked log log10 log2 logfile logfiles logging logical logical_reads_per_call logoff logon logs long loop low low_priority lower lpad lrtrim ltrim main make_set makedate maketime managed management manual map mapping mask master master_pos_wait match matched materialized max maxextents maximize maxinstances maxlen maxlogfiles maxloghistory maxlogmembers maxsize maxtrans md5 measures median medium member memcompress memory merge microsecond mid migration min minextents minimum mining minus minute minutes minvalue missing mod mode model modification modify module monitoring month months mount move movement multiset mutex name name_const names nan national native natural nav nchar nclob nested never new newline next nextval no no_write_to_binlog noarchivelog noaudit nobadfile nocheck nocompress nocopy nocycle nodelay nodiscardfile noentityescaping noguarantee nokeep nologfile nomapping nomaxvalue nominimize nominvalue nomonitoring none noneditionable nonschema noorder nopr nopro noprom nopromp noprompt norely noresetlogs noreverse normal norowdependencies noschemacheck noswitch not nothing notice notnull notrim novalidate now nowait nth_value nullif nulls num numb numbe nvarchar nvarchar2 object ocicoll ocidate ocidatetime ociduration ociinterval ociloblocator ocinumber ociref ocirefcursor ocirowid ocistring ocitype oct octet_length of off offline offset oid oidindex old on online only opaque open operations operator optimal optimize option optionally or oracle oracle_date oradata ord ordaudio orddicom orddoc order ordimage ordinality ordvideo organization orlany orlvary out outer outfile outline output over overflow overriding package pad parallel parallel_enable parameters parent parse partial partition partitions pascal passing password password_grace_time password_lock_time password_reuse_max password_reuse_time password_verify_function patch path patindex pctincrease pctthreshold pctused pctversion percent percent_rank percentile_cont percentile_disc performance period period_add period_diff permanent physical pi pipe pipelined pivot pluggable plugin policy position post_transaction pow power pragma prebuilt precedes preceding precision prediction prediction_cost prediction_details prediction_probability prediction_set prepare present preserve prior priority private private_sga privileges procedural procedure procedure_analyze processlist profiles project prompt protection public publishingservername purge quarter query quick quiesce quota quotename radians raise rand range rank raw read reads readsize rebuild record records recover recovery recursive recycle redo reduced ref reference referenced references referencing refresh regexp_like register regr_avgx regr_avgy regr_count regr_intercept regr_r2 regr_slope regr_sxx regr_sxy reject rekey relational relative relaylog release release_lock relies_on relocate rely rem remainder rename repair repeat replace replicate replication required reset resetlogs resize resource respect restore restricted result result_cache resumable resume retention return returning returns reuse reverse revoke right rlike role roles rollback rolling rollup round row row_count rowdependencies rowid rownum rows rtrim rules safe salt sample save savepoint sb1 sb2 sb4 scan schema schemacheck scn scope scroll sdo_georaster sdo_topo_geometry search sec_to_time second seconds section securefile security seed segment select self semi sequence sequential serializable server servererror session session_user sessions_per_user set sets settings sha sha1 sha2 share shared shared_pool short show shrink shutdown si_averagecolor si_colorhistogram si_featurelist si_positionalcolor si_stillimage si_texture siblings sid sign sin size size_t sizes skip slave sleep smalldatetimefromparts smallfile snapshot some soname sort soundex source space sparse spfile split sql sql_big_result sql_buffer_result sql_cache sql_calc_found_rows sql_small_result sql_variant_property sqlcode sqldata sqlerror sqlname sqlstate sqrt square standalone standby start starting startup statement static statistics stats_binomial_test stats_crosstab stats_ks_test stats_mode stats_mw_test stats_one_way_anova stats_t_test_ stats_t_test_indep stats_t_test_one stats_t_test_paired stats_wsr_test status std stddev stddev_pop stddev_samp stdev stop storage store stored str str_to_date straight_join strcmp strict string struct stuff style subdate subpartition subpartitions substitutable substr substring subtime subtring_index subtype success sum suspend switch switchoffset switchover sync synchronous synonym sys sys_xmlagg sysasm sysaux sysdate sysdatetimeoffset sysdba sysoper system system_user sysutcdatetime table tables tablespace tablesample tan tdo template temporary terminated tertiary_weights test than then thread through tier ties time time_format time_zone timediff timefromparts timeout timestamp timestampadd timestampdiff timezone_abbr timezone_minute timezone_region to to_base64 to_date to_days to_seconds todatetimeoffset trace tracking transaction transactional translate translation treat trigger trigger_nestlevel triggers trim truncate try_cast try_convert try_parse type ub1 ub2 ub4 ucase unarchived unbounded uncompress under undo unhex unicode uniform uninstall union unique unix_timestamp unknown unlimited unlock unnest unpivot unrecoverable unsafe unsigned until untrusted unusable unused update updated upgrade upped upper upsert url urowid usable usage use use_stored_outlines user user_data user_resources users using utc_date utc_timestamp uuid uuid_short validate validate_password_strength validation valist value values var var_samp varcharc vari varia variab variabl variable variables variance varp varraw varrawc varray verify version versions view virtual visible void wait wallet warning warnings week weekday weekofyear wellformed when whene whenev wheneve whenever where while whitespace window with within without work wrapped xdb xml xmlagg xmlattributes xmlcast xmlcolattval xmlelement xmlexists xmlforest xmlindex xmlnamespaces xmlpi xmlquery xmlroot xmlschema xmlserialize xmltable xmltype xor year year_to_month years yearweek",
              literal: "true false null unknown",
              built_in: "array bigint binary bit blob bool boolean char character date dec decimal float int int8 integer interval number numeric real record serial serial8 smallint text time timestamp tinyint varchar varchar2 varying void"
            },
            contains: [
              {
                className: "string",
                begin: "'",
                end: "'",
                contains: [{ begin: "''" }]
              },
              {
                className: "string",
                begin: '"',
                end: '"',
                contains: [{ begin: '""' }]
              },
              {
                className: "string",
                begin: "`",
                end: "`"
              },
              e.C_NUMBER_MODE,
              e.C_BLOCK_COMMENT_MODE,
              t,
              e.HASH_COMMENT_MODE
            ]
          },
          e.C_BLOCK_COMMENT_MODE,
          t,
          e.HASH_COMMENT_MODE
        ]
      };
    };
  })()
);
hljs.registerLanguage(
  "python-repl",
  (() => {
    return (s) => ({
      aliases: ["pycon"],
      contains: [
        {
          className: "meta",
          starts: { end: / |$/, starts: { end: "$", subLanguage: "python" } },
          variants: [
            { begin: /^>>>(?=[ ]|$)/ },
            {
              begin: /^\.\.\.(?=[ ]|$)/
            }
          ]
        }
      ]
    });
  })()
);
hljs.registerLanguage(
  "csharp",
  (() => {
    return (e) => {
      var n = {
        keyword: [
          "abstract",
          "as",
          "base",
          "break",
          "case",
          "class",
          "const",
          "continue",
          "do",
          "else",
          "event",
          "explicit",
          "extern",
          "finally",
          "fixed",
          "for",
          "foreach",
          "goto",
          "if",
          "implicit",
          "in",
          "interface",
          "internal",
          "is",
          "lock",
          "namespace",
          "new",
          "operator",
          "out",
          "override",
          "params",
          "private",
          "protected",
          "public",
          "readonly",
          "record",
          "ref",
          "return",
          "sealed",
          "sizeof",
          "stackalloc",
          "static",
          "struct",
          "switch",
          "this",
          "throw",
          "try",
          "typeof",
          "unchecked",
          "unsafe",
          "using",
          "virtual",
          "void",
          "volatile",
          "while"
        ].concat([
          "add",
          "alias",
          "and",
          "ascending",
          "async",
          "await",
          "by",
          "descending",
          "equals",
          "from",
          "get",
          "global",
          "group",
          "init",
          "into",
          "join",
          "let",
          "nameof",
          "not",
          "notnull",
          "on",
          "or",
          "orderby",
          "partial",
          "remove",
          "select",
          "set",
          "unmanaged",
          "value|0",
          "var",
          "when",
          "where",
          "with",
          "yield"
        ]).join(" "),
        built_in: "bool byte char decimal delegate double dynamic enum float int long nint nuint object sbyte short string ulong unit ushort",
        literal: "default false null true"
      }, a = e.inherit(e.TITLE_MODE, {
        begin: "[a-zA-Z](\\.?\\w)*"
      }), i = {
        className: "number",
        variants: [
          {
            begin: "\\b(0b[01']+)"
          },
          {
            begin: "(-?)\\b([\\d']+(\\.[\\d']*)?|\\.[\\d']+)(u|U|l|L|ul|UL|f|F|b|B)"
          },
          {
            begin: "(-?)(\\b0[xX][a-fA-F0-9']+|(\\b[\\d']+(\\.[\\d']*)?|\\.[\\d']+)([eE][-+]?[\\d']+)?)"
          }
        ],
        relevance: 0
      }, s = {
        className: "string",
        begin: '@"',
        end: '"',
        contains: [{ begin: '""' }]
      }, t = e.inherit(s, { illegal: /\n/ }), r = { className: "subst", begin: /\{/, end: /\}/, keywords: n }, l = e.inherit(r, { illegal: /\n/ }), c = {
        className: "string",
        begin: /\$"/,
        end: '"',
        illegal: /\n/,
        contains: [
          { begin: /\{\{/ },
          { begin: /\}\}/ },
          e.BACKSLASH_ESCAPE,
          l
        ]
      }, o = {
        className: "string",
        begin: /\$@"/,
        end: '"',
        contains: [
          {
            begin: /\{\{/
          },
          { begin: /\}\}/ },
          { begin: '""' },
          r
        ]
      }, d = e.inherit(o, {
        illegal: /\n/,
        contains: [{ begin: /\{\{/ }, { begin: /\}\}/ }, { begin: '""' }, l]
      });
      r.contains = [
        o,
        c,
        s,
        e.APOS_STRING_MODE,
        e.QUOTE_STRING_MODE,
        i,
        e.C_BLOCK_COMMENT_MODE
      ], l.contains = [
        d,
        c,
        t,
        e.APOS_STRING_MODE,
        e.QUOTE_STRING_MODE,
        i,
        e.inherit(e.C_BLOCK_COMMENT_MODE, {
          illegal: /\n/
        })
      ];
      var g = { variants: [o, c, s, e.APOS_STRING_MODE, e.QUOTE_STRING_MODE] }, E = {
        begin: "<",
        end: ">",
        contains: [{ beginKeywords: "in out" }, a]
      }, _ = e.IDENT_RE + "(<" + e.IDENT_RE + "(\\s*,\\s*" + e.IDENT_RE + ")*>)?(\\[\\])?", b = {
        begin: "@" + e.IDENT_RE,
        relevance: 0
      };
      return {
        name: "C#",
        aliases: ["cs", "c#"],
        keywords: n,
        illegal: /::/,
        contains: [
          e.COMMENT("///", "$", {
            returnBegin: true,
            contains: [
              {
                className: "doctag",
                variants: [
                  { begin: "///", relevance: 0 },
                  {
                    begin: "<!--|-->"
                  },
                  { begin: "</?", end: ">" }
                ]
              }
            ]
          }),
          e.C_LINE_COMMENT_MODE,
          e.C_BLOCK_COMMENT_MODE,
          {
            className: "meta",
            begin: "#",
            end: "$",
            keywords: {
              "meta-keyword": "if else elif endif define undef warning error line region endregion pragma checksum"
            }
          },
          g,
          i,
          {
            beginKeywords: "class interface",
            relevance: 0,
            end: /[{;=]/,
            illegal: /[^\s:,]/,
            contains: [
              { beginKeywords: "where class" },
              a,
              E,
              e.C_LINE_COMMENT_MODE,
              e.C_BLOCK_COMMENT_MODE
            ]
          },
          {
            beginKeywords: "namespace",
            relevance: 0,
            end: /[{;=]/,
            illegal: /[^\s:]/,
            contains: [a, e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE]
          },
          {
            beginKeywords: "record",
            relevance: 0,
            end: /[{;=]/,
            illegal: /[^\s:]/,
            contains: [a, E, e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE]
          },
          {
            className: "meta",
            begin: "^\\s*\\[",
            excludeBegin: true,
            end: "\\]",
            excludeEnd: true,
            contains: [
              {
                className: "meta-string",
                begin: /"/,
                end: /"/
              }
            ]
          },
          {
            beginKeywords: "new return throw await else",
            relevance: 0
          },
          {
            className: "function",
            begin: "(" + _ + "\\s+)+" + e.IDENT_RE + "\\s*(<.+>)?\\s*\\(",
            returnBegin: true,
            end: /\s*[{;=]/,
            excludeEnd: true,
            keywords: n,
            contains: [
              {
                beginKeywords: "public private protected static internal protected abstract async extern override unsafe virtual new sealed partial",
                relevance: 0
              },
              {
                begin: e.IDENT_RE + "\\s*(<.+>)?\\s*\\(",
                returnBegin: true,
                contains: [e.TITLE_MODE, E],
                relevance: 0
              },
              {
                className: "params",
                begin: /\(/,
                end: /\)/,
                excludeBegin: true,
                excludeEnd: true,
                keywords: n,
                relevance: 0,
                contains: [g, i, e.C_BLOCK_COMMENT_MODE]
              },
              e.C_LINE_COMMENT_MODE,
              e.C_BLOCK_COMMENT_MODE
            ]
          },
          b
        ]
      };
    };
  })()
);
hljs.registerLanguage(
  "php",
  (() => {
    return (e) => {
      const r = {
        className: "variable",
        begin: "\\$+[a-zA-Z_\x7F-\xFF][a-zA-Z0-9_\x7F-\xFF]*(?![A-Za-z0-9])(?![$])"
      }, t = {
        className: "meta",
        variants: [
          { begin: /<\?php/, relevance: 10 },
          { begin: /<\?[=]?/ },
          {
            begin: /\?>/
          }
        ]
      }, a = {
        className: "subst",
        variants: [{ begin: /\$\w+/ }, { begin: /\{\$/, end: /\}/ }]
      }, n = e.inherit(e.APOS_STRING_MODE, { illegal: null }), i = e.inherit(e.QUOTE_STRING_MODE, {
        illegal: null,
        contains: e.QUOTE_STRING_MODE.contains.concat(a)
      }), o = e.END_SAME_AS_BEGIN({
        begin: /<<<[ \t]*(\w+)\n/,
        end: /[ \t]*(\w+)\b/,
        contains: e.QUOTE_STRING_MODE.contains.concat(a)
      }), l = {
        className: "string",
        contains: [e.BACKSLASH_ESCAPE, t],
        variants: [
          e.inherit(n, { begin: "b'", end: "'" }),
          e.inherit(i, { begin: 'b"', end: '"' }),
          i,
          n,
          o
        ]
      }, c = {
        variants: [e.BINARY_NUMBER_MODE, e.C_NUMBER_MODE]
      }, s = {
        keyword: "__CLASS__ __DIR__ __FILE__ __FUNCTION__ __LINE__ __METHOD__ __NAMESPACE__ __TRAIT__ die echo exit include include_once print require require_once array abstract and as binary bool boolean break callable case catch class clone const continue declare default do double else elseif empty enddeclare endfor endforeach endif endswitch endwhile eval extends final finally float for foreach from global goto if implements instanceof insteadof int integer interface isset iterable list match|0 new object or private protected public real return string switch throw trait try unset use var void while xor yield",
        literal: "false null true",
        built_in: "Error|0 AppendIterator ArgumentCountError ArithmeticError ArrayIterator ArrayObject AssertionError BadFunctionCallException BadMethodCallException CachingIterator CallbackFilterIterator CompileError Countable DirectoryIterator DivisionByZeroError DomainException EmptyIterator ErrorException Exception FilesystemIterator FilterIterator GlobIterator InfiniteIterator InvalidArgumentException IteratorIterator LengthException LimitIterator LogicException MultipleIterator NoRewindIterator OutOfBoundsException OutOfRangeException OuterIterator OverflowException ParentIterator ParseError RangeException RecursiveArrayIterator RecursiveCachingIterator RecursiveCallbackFilterIterator RecursiveDirectoryIterator RecursiveFilterIterator RecursiveIterator RecursiveIteratorIterator RecursiveRegexIterator RecursiveTreeIterator RegexIterator RuntimeException SeekableIterator SplDoublyLinkedList SplFileInfo SplFileObject SplFixedArray SplHeap SplMaxHeap SplMinHeap SplObjectStorage SplObserver SplObserver SplPriorityQueue SplQueue SplStack SplSubject SplSubject SplTempFileObject TypeError UnderflowException UnexpectedValueException ArrayAccess Closure Generator Iterator IteratorAggregate Serializable Throwable Traversable WeakReference Directory __PHP_Incomplete_Class parent php_user_filter self static stdClass"
      };
      return {
        aliases: ["php", "php3", "php4", "php5", "php6", "php7", "php8"],
        case_insensitive: true,
        keywords: s,
        contains: [
          e.HASH_COMMENT_MODE,
          e.COMMENT("//", "$", { contains: [t] }),
          e.COMMENT("/\\*", "\\*/", {
            contains: [{ className: "doctag", begin: "@[A-Za-z]+" }]
          }),
          e.COMMENT("__halt_compiler.+?;", false, {
            endsWithParent: true,
            keywords: "__halt_compiler"
          }),
          t,
          { className: "keyword", begin: /\$this\b/ },
          r,
          {
            begin: /(::|->)+[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*/
          },
          {
            className: "function",
            relevance: 0,
            beginKeywords: "fn function",
            end: /[;{]/,
            excludeEnd: true,
            illegal: "[$%\\[]",
            contains: [
              e.UNDERSCORE_TITLE_MODE,
              { begin: "=>" },
              {
                className: "params",
                begin: "\\(",
                end: "\\)",
                excludeBegin: true,
                excludeEnd: true,
                keywords: s,
                contains: ["self", r, e.C_BLOCK_COMMENT_MODE, l, c]
              }
            ]
          },
          {
            className: "class",
            beginKeywords: "class interface",
            relevance: 0,
            end: /\{/,
            excludeEnd: true,
            illegal: /[:($"]/,
            contains: [
              { beginKeywords: "extends implements" },
              e.UNDERSCORE_TITLE_MODE
            ]
          },
          {
            beginKeywords: "namespace",
            relevance: 0,
            end: ";",
            illegal: /[.']/,
            contains: [e.UNDERSCORE_TITLE_MODE]
          },
          {
            beginKeywords: "use",
            relevance: 0,
            end: ";",
            contains: [e.UNDERSCORE_TITLE_MODE]
          },
          l,
          c
        ]
      };
    };
  })()
);
hljs.registerLanguage(
  "php-template",
  (() => {
    return (n) => ({
      name: "PHP template",
      subLanguage: "xml",
      contains: [
        {
          begin: /<\?(php|=)?/,
          end: /\?>/,
          subLanguage: "php",
          contains: [
            { begin: "/\\*", end: "\\*/", skip: true },
            { begin: 'b"', end: '"', skip: true },
            { begin: "b'", end: "'", skip: true },
            n.inherit(n.APOS_STRING_MODE, {
              illegal: null,
              className: null,
              contains: null,
              skip: true
            }),
            n.inherit(n.QUOTE_STRING_MODE, {
              illegal: null,
              className: null,
              contains: null,
              skip: true
            })
          ]
        }
      ]
    });
  })()
);
hljs.registerLanguage(
  "rust",
  (() => {
    return (e) => {
      const n = "([ui](8|16|32|64|128|size)|f(32|64))?", t = "drop i8 i16 i32 i64 i128 isize u8 u16 u32 u64 u128 usize f32 f64 str char bool Box Option Result String Vec Copy Send Sized Sync Drop Fn FnMut FnOnce ToOwned Clone Debug PartialEq PartialOrd Eq Ord AsRef AsMut Into From Default Iterator Extend IntoIterator DoubleEndedIterator ExactSizeIterator SliceConcatExt ToString assert! assert_eq! bitflags! bytes! cfg! col! concat! concat_idents! debug_assert! debug_assert_eq! env! panic! file! format! format_args! include_bin! include_str! line! local_data_key! module_path! option_env! print! println! select! stringify! try! unimplemented! unreachable! vec! write! writeln! macro_rules! assert_ne! debug_assert_ne!";
      return {
        name: "Rust",
        aliases: ["rs"],
        keywords: {
          $pattern: e.IDENT_RE + "!?",
          keyword: "abstract as async await become box break const continue crate do dyn else enum extern false final fn for if impl in let loop macro match mod move mut override priv pub ref return self Self static struct super trait true try type typeof unsafe unsized use virtual where while yield",
          literal: "true false Some None Ok Err",
          built_in: t
        },
        illegal: "</",
        contains: [
          e.C_LINE_COMMENT_MODE,
          e.COMMENT("/\\*", "\\*/", { contains: ["self"] }),
          e.inherit(e.QUOTE_STRING_MODE, { begin: /b?"/, illegal: null }),
          {
            className: "string",
            variants: [
              { begin: /r(#*)"(.|\n)*?"\1(?!#)/ },
              {
                begin: /b?'\\?(x\w{2}|u\w{4}|U\w{8}|.)'/
              }
            ]
          },
          { className: "symbol", begin: /'[a-zA-Z_][a-zA-Z0-9_]*/ },
          {
            className: "number",
            variants: [
              {
                begin: "\\b0b([01_]+)" + n
              },
              { begin: "\\b0o([0-7_]+)" + n },
              {
                begin: "\\b0x([A-Fa-f0-9_]+)" + n
              },
              {
                begin: "\\b(\\d[\\d_]*(\\.[0-9_]+)?([eE][+-]?[0-9_]+)?)" + n
              }
            ],
            relevance: 0
          },
          {
            className: "function",
            beginKeywords: "fn",
            end: "(\\(|<)",
            excludeEnd: true,
            contains: [e.UNDERSCORE_TITLE_MODE]
          },
          {
            className: "meta",
            begin: "#!?\\[",
            end: "\\]",
            contains: [{ className: "meta-string", begin: /"/, end: /"/ }]
          },
          {
            className: "class",
            beginKeywords: "type",
            end: ";",
            contains: [
              e.inherit(e.UNDERSCORE_TITLE_MODE, {
                endsParent: true
              })
            ],
            illegal: "\\S"
          },
          {
            className: "class",
            beginKeywords: "trait enum struct union",
            end: /\{/,
            contains: [e.inherit(e.UNDERSCORE_TITLE_MODE, { endsParent: true })],
            illegal: "[\\w\\d]"
          },
          { begin: e.IDENT_RE + "::", keywords: { built_in: t } },
          { begin: "->" }
        ]
      };
    };
  })()
);
hljs.registerLanguage(
  "shell",
  (() => {
    return (s) => ({
      name: "Shell Session",
      aliases: ["console"],
      contains: [
        {
          className: "meta",
          begin: /^\s{0,3}[/~\w\d[\]()@-]*[>%$#]/,
          starts: { end: /[^\\](?=\s*$)/, subLanguage: "bash" }
        }
      ]
    });
  })()
);
hljs.registerLanguage(
  "apache",
  (() => {
    return (e) => {
      const n = {
        className: "number",
        begin: "\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}(:\\d{1,5})?"
      };
      return {
        name: "Apache config",
        aliases: ["apacheconf"],
        case_insensitive: true,
        contains: [
          e.HASH_COMMENT_MODE,
          {
            className: "section",
            begin: "</?",
            end: ">",
            contains: [
              n,
              { className: "number", begin: ":\\d{1,5}" },
              e.inherit(e.QUOTE_STRING_MODE, { relevance: 0 })
            ]
          },
          {
            className: "attribute",
            begin: /\w+/,
            relevance: 0,
            keywords: {
              nomarkup: "order deny allow setenv rewriterule rewriteengine rewritecond documentroot sethandler errordocument loadmodule options header listen serverroot servername"
            },
            starts: {
              end: /$/,
              relevance: 0,
              keywords: { literal: "on off all deny allow" },
              contains: [
                { className: "meta", begin: "\\s\\[", end: "\\]$" },
                {
                  className: "variable",
                  begin: "[\\$%]\\{",
                  end: "\\}",
                  contains: [
                    "self",
                    { className: "number", begin: "[\\$%]\\d+" }
                  ]
                },
                n,
                { className: "number", begin: "\\d+" },
                e.QUOTE_STRING_MODE
              ]
            }
          }
        ],
        illegal: /\S/
      };
    };
  })()
);
hljs.registerLanguage(
  "css",
  (() => {
    return (e) => {
      var n = "[a-zA-Z-][a-zA-Z0-9_-]*", a = {
        begin: /([*]\s?)?(?:[A-Z_.\-\\]+|--[a-zA-Z0-9_-]+)\s*(\/\*\*\/)?:/,
        returnBegin: true,
        end: ";",
        endsWithParent: true,
        contains: [
          {
            className: "attribute",
            begin: /\S/,
            end: ":",
            excludeEnd: true,
            starts: {
              endsWithParent: true,
              excludeEnd: true,
              contains: [
                {
                  begin: /[\w-]+\(/,
                  returnBegin: true,
                  contains: [
                    { className: "built_in", begin: /[\w-]+/ },
                    {
                      begin: /\(/,
                      end: /\)/,
                      contains: [
                        e.APOS_STRING_MODE,
                        e.QUOTE_STRING_MODE,
                        e.CSS_NUMBER_MODE
                      ]
                    }
                  ]
                },
                e.CSS_NUMBER_MODE,
                e.QUOTE_STRING_MODE,
                e.APOS_STRING_MODE,
                e.C_BLOCK_COMMENT_MODE,
                {
                  className: "number",
                  begin: "#[0-9A-Fa-f]+"
                },
                { className: "meta", begin: "!important" }
              ]
            }
          }
        ]
      };
      return {
        name: "CSS",
        case_insensitive: true,
        illegal: /[=|'\$]/,
        contains: [
          e.C_BLOCK_COMMENT_MODE,
          { className: "selector-id", begin: /#[A-Za-z0-9_-]+/ },
          { className: "selector-class", begin: "\\." + n },
          {
            className: "selector-attr",
            begin: /\[/,
            end: /\]/,
            illegal: "$",
            contains: [e.APOS_STRING_MODE, e.QUOTE_STRING_MODE]
          },
          { className: "selector-pseudo", begin: /:(:)?[a-zA-Z0-9_+()"'.-]+/ },
          {
            begin: "@(page|font-face)",
            lexemes: "@[a-z-]+",
            keywords: "@page @font-face"
          },
          {
            begin: "@",
            end: "[{;]",
            illegal: /:/,
            returnBegin: true,
            contains: [
              { className: "keyword", begin: /@-?\w[\w]*(-\w+)*/ },
              {
                begin: /\s/,
                endsWithParent: true,
                excludeEnd: true,
                relevance: 0,
                keywords: "and or not only",
                contains: [
                  { begin: /[a-z-]+:/, className: "attribute" },
                  e.APOS_STRING_MODE,
                  e.QUOTE_STRING_MODE,
                  e.CSS_NUMBER_MODE
                ]
              }
            ]
          },
          { className: "selector-tag", begin: n, relevance: 0 },
          {
            begin: /\{/,
            end: /\}/,
            illegal: /\S/,
            contains: [e.C_BLOCK_COMMENT_MODE, { begin: /;/ }, a]
          }
        ]
      };
    };
  })()
);
const MkitCsslist = [
  {
    value: "a11y-dark.css",
    label: "a11y-dark.css"
  },
  {
    value: "a11y-light.css",
    label: "a11y-light.css"
  },
  {
    value: "agate.css",
    label: "agate.css"
  },
  {
    value: "an-old-hope.css",
    label: "an-old-hope.css"
  },
  {
    value: "androidstudio.css",
    label: "androidstudio.css"
  },
  {
    value: "arduino-light.css",
    label: "arduino-light.css"
  },
  {
    value: "arta.css",
    label: "arta.css"
  },
  {
    value: "ascetic.css",
    label: "ascetic.css"
  },
  {
    value: "atelier-cave-dark.css",
    label: "atelier-cave-dark.css"
  },
  {
    value: "atelier-cave-light.css",
    label: "atelier-cave-light.css"
  },
  {
    value: "atelier-dune-dark.css",
    label: "atelier-dune-dark.css"
  },
  {
    value: "atelier-dune-light.css",
    label: "atelier-dune-light.css"
  },
  {
    value: "atelier-estuary-dark.css",
    label: "atelier-estuary-dark.css"
  },
  {
    value: "atelier-estuary-light.css",
    label: "atelier-estuary-light.css"
  },
  {
    value: "atelier-forest-dark.css",
    label: "atelier-forest-dark.css"
  },
  {
    value: "atelier-forest-light.css",
    label: "atelier-forest-light.css"
  },
  {
    value: "atelier-heath-dark.css",
    label: "atelier-heath-dark.css"
  },
  {
    value: "atelier-heath-light.css",
    label: "atelier-heath-light.css"
  },
  {
    value: "atelier-lakeside-dark.css",
    label: "atelier-lakeside-dark.css"
  },
  {
    value: "atelier-lakeside-light.css",
    label: "atelier-lakeside-light.css"
  },
  {
    value: "atelier-plateau-dark.css",
    label: "atelier-plateau-dark.css"
  },
  {
    value: "atelier-plateau-light.css",
    label: "atelier-plateau-light.css"
  },
  {
    value: "atelier-savanna-dark.css",
    label: "atelier-savanna-dark.css"
  },
  {
    value: "atelier-savanna-light.css",
    label: "atelier-savanna-light.css"
  },
  {
    value: "atelier-seaside-dark.css",
    label: "atelier-seaside-dark.css"
  },
  {
    value: "atelier-seaside-light.css",
    label: "atelier-seaside-light.css"
  },
  {
    value: "atelier-sulphurpool-dark.css",
    label: "atelier-sulphurpool-dark.css"
  },
  {
    value: "atelier-sulphurpool-light.css",
    label: "atelier-sulphurpool-light.css"
  },
  {
    value: "atom-one-dark-reasonable.css",
    label: "atom-one-dark-reasonable.css"
  },
  {
    value: "atom-one-dark.css",
    label: "atom-one-dark.css"
  },
  {
    value: "atom-one-light.css",
    label: "atom-one-light.css"
  },
  {
    value: "brown-paper.css",
    label: "brown-paper.css"
  },
  {
    value: "codepen-embed.css",
    label: "codepen-embed.css"
  },
  {
    value: "color-brewer.css",
    label: "color-brewer.css"
  },
  {
    value: "darcula.css",
    label: "darcula.css"
  },
  {
    value: "dark.css",
    label: "dark.css"
  },
  {
    value: "default.css",
    label: "default.css"
  },
  {
    value: "docco.css",
    label: "docco.css"
  },
  {
    value: "dracula.css",
    label: "dracula.css"
  },
  {
    value: "far.css",
    label: "far.css"
  },
  {
    value: "foundation.css",
    label: "foundation.css"
  },
  {
    value: "github-gist.css",
    label: "github-gist.css"
  },
  {
    value: "github.css",
    label: "github.css"
  },
  {
    value: "gml.css",
    label: "gml.css"
  },
  {
    value: "googlecode.css",
    label: "googlecode.css"
  },
  {
    value: "gradient-dark.css",
    label: "gradient-dark.css"
  },
  {
    value: "gradient-light.css",
    label: "gradient-light.css"
  },
  {
    value: "grayscale.css",
    label: "grayscale.css"
  },
  {
    value: "gruvbox-dark.css",
    label: "gruvbox-dark.css"
  },
  {
    value: "gruvbox-light.css",
    label: "gruvbox-light.css"
  },
  {
    value: "hopscotch.css",
    label: "hopscotch.css"
  },
  {
    value: "hybrid.css",
    label: "hybrid.css"
  },
  {
    value: "idea.css",
    label: "idea.css"
  },
  {
    value: "ir-black.css",
    label: "ir-black.css"
  },
  {
    value: "isbl-editor-dark.css",
    label: "isbl-editor-dark.css"
  },
  {
    value: "isbl-editor-light.css",
    label: "isbl-editor-light.css"
  },
  {
    value: "kimbie.dark.css",
    label: "kimbie.dark.css"
  },
  {
    value: "kimbie.light.css",
    label: "kimbie.light.css"
  },
  {
    value: "lightfair.css",
    label: "lightfair.css"
  },
  {
    value: "lioshi.css",
    label: "lioshi.css"
  },
  {
    value: "magula.css",
    label: "magula.css"
  },
  {
    value: "mono-blue.css",
    label: "mono-blue.css"
  },
  {
    value: "monokai-sublime.css",
    label: "monokai-sublime.css"
  },
  {
    value: "monokai.css",
    label: "monokai.css"
  },
  {
    value: "night-owl.css",
    label: "night-owl.css"
  },
  {
    value: "nnfx-dark.css",
    label: "nnfx-dark.css"
  },
  {
    value: "nnfx.css",
    label: "nnfx.css"
  },
  {
    value: "nord.css",
    label: "nord.css"
  },
  {
    value: "obsidian.css",
    label: "obsidian.css"
  },
  {
    value: "ocean.css",
    label: "ocean.css"
  },
  {
    value: "paraiso-dark.css",
    label: "paraiso-dark.css"
  },
  {
    value: "paraiso-light.css",
    label: "paraiso-light.css"
  },
  {
    value: "pojoaque.css",
    label: "pojoaque.css"
  },
  {
    value: "purebasic.css",
    label: "purebasic.css"
  },
  {
    value: "qtcreator_dark.css",
    label: "qtcreator_dark.css"
  },
  {
    value: "qtcreator_light.css",
    label: "qtcreator_light.css"
  },
  {
    value: "railscasts.css",
    label: "railscasts.css"
  },
  {
    value: "rainbow.css",
    label: "rainbow.css"
  },
  {
    value: "routeros.css",
    label: "routeros.css"
  },
  {
    value: "school-book.css",
    label: "school-book.css"
  },
  {
    value: "shades-of-purple.css",
    label: "shades-of-purple.css"
  },
  {
    value: "solarized-dark.css",
    label: "solarized-dark.css"
  },
  {
    value: "solarized-light.css",
    label: "solarized-light.css"
  },
  {
    value: "srcery.css",
    label: "srcery.css"
  },
  {
    value: "stackoverflow-dark.css",
    label: "stackoverflow-dark.css"
  },
  {
    value: "stackoverflow-light.css",
    label: "stackoverflow-light.css"
  },
  {
    value: "sunburst.css",
    label: "sunburst.css"
  },
  {
    value: "tomorrow-night-blue.css",
    label: "tomorrow-night-blue.css"
  },
  {
    value: "tomorrow-night-bright.css",
    label: "tomorrow-night-bright.css"
  },
  {
    value: "tomorrow-night-eighties.css",
    label: "tomorrow-night-eighties.css"
  },
  {
    value: "tomorrow-night.css",
    label: "tomorrow-night.css"
  },
  {
    value: "tomorrow.css",
    label: "tomorrow.css"
  },
  {
    value: "vs.css",
    label: "vs.css"
  },
  {
    value: "vs2015.css",
    label: "vs2015.css"
  },
  {
    value: "xcode.css",
    label: "xcode.css"
  },
  {
    value: "xt256.css",
    label: "xt256.css"
  },
  {
    value: "zenburn.css",
    label: "zenburn.css"
  }
];
const setTheme = async (theme) => {
  theme = theme || localStorage.markdownHightlightTheme || "monokai-sublime.css";
  const cssURL = `${VentoseUI.State_UI.assetsPath}/highlightstyles/${theme}`;
  localStorage.markdownHightlightTheme = theme;
  const content = await VentoseUI.xU.asyncLoadText(cssURL);
  const id = `markdonw-hightlight-style`;
  const $style = $(`#${id}`);
  if ($style.length == 0) {
    $("body").append($("<style/>", {
      id
    }));
  }
  $style.html(content);
};
const MkitTheme = Vue.defineComponent({
  setup() {
    return {
      setTheme
    };
  },
  computed: {
    cssURL() {
      return;
    }
  },
  watch: {
    theme: {
      immediate: true,
      async handler(theme) {
        this.setTheme(theme);
      }
    }
  },
  data() {
    return {
      theme: localStorage.markdownHightlightTheme || "monokai-sublime.css"
    };
  },
  render() {
    return Vue.withDirectives(Vue.createVNode("select", {
      "class": "markdown-theme",
      "onUpdate:modelValue": ($event) => this.theme = $event
    }, [VentoseUI.xU.map(MkitCsslist, (i) => {
      return Vue.createVNode("option", {
        "key": i.value,
        "value": i.value
      }, [i.label]);
    })]), [[Vue.vModelSelect, this.theme]]);
  }
});
const MarkdownIt_vue_vue_type_style_index_0_lang = "";
const _sfc_main$1 = {
  props: ["md"],
  setup() {
    setTheme();
  },
  data() {
    return {
      originHTML: "",
      html: "",
      configsPopoverChangeTheme: {
        trigger: "rightClick",
        content: MkitTheme,
        openAtPoint: true
      }
    };
  },
  async mounted() {
    this.init();
  },
  watch: {
    md() {
      this.init();
    }
  },
  methods: {
    init() {
      this.originHTML = this.md || this.$slots.default()[0].children;
      const { Renderer } = marked;
      marked.options = { langClass: "hljs" };
      const renderer = new Renderer();
      this.html = marked(this.originHTML, {
        renderer,
        highlight: (code) => hljs.highlightAuto(code).value
      });
    }
  }
};
const _hoisted_1 = {
  class: "markdown-wrapper",
  title: "\u53F3\u952E\u70B9\u51FB\u53EF\u4EE5\u4FEE\u6539<code/>\u5143\u7D20\u9AD8\u4EAE\u6837\u5F0F"
};
const _hoisted_2 = ["innerHTML"];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _directive_uiPopover = Vue.resolveDirective("uiPopover");
  return Vue.withDirectives((Vue.openBlock(), Vue.createElementBlock("div", _hoisted_1, [
    Vue.createElementVNode("div", {
      class: "markdown-wrapper_description mt10",
      innerHTML: $data.html
    }, null, 8, _hoisted_2)
  ])), [
    [_directive_uiPopover, $data.configsPopoverChangeTheme]
  ]);
}
const Mkit = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render]]);
const DialogSourceCode = Vue.defineComponent({
  props: {
    propDialogOptions: {
      type: Object,
      default() {
        return {
          __elId: false
        };
      }
    }
  },
  render() {
    return Vue.createVNode("div", {
      "class": "padding20"
    }, [Vue.createVNode(Vue.resolveComponent("mkit"), {
      "md": this.propDialogOptions.code
    }, null)]);
  }
});
const DemoAndCode = Vue.defineComponent({
  props: ["path", "title"],
  setup() {
    return {
      State_UI: VentoseUI.State_UI
    };
  },
  computed: {
    sfcURL() {
      return `${this.State_UI.assetsPath}${this.path}`;
    },
    styleContainer() {
      return {
        position: "relative",
        overflow: this.isFold ? "hidden" : "unset"
      };
    }
  },
  data() {
    return {
      isInitDone: false,
      isFold: true,
      isLoading: true,
      BussinessComponent: false,
      BussinessComponentSourceCode: ""
    };
  },
  methods: {
    toggleFold() {
      this.isFold = !this.isFold;
      this.getBussinessComponent();
    },
    async rerun(scfObjSourceCode) {
      try {
        if (!scfObjSourceCode) {
          this.BussinessComponent = "";
        } else {
          throw new Error("");
        }
      } catch (e) {
        const _BussinessComponent = await VentoseUI.xU.getVueComponentBySourceCode(this.sfcURL, scfObjSourceCode, new Proxy({
          reactive: Vue.reactive,
          defineComponent: Vue.defineComponent,
          markRaw: Vue.markRaw,
          State_UI: VentoseUI.State_UI,
          xU: VentoseUI.xU,
          UI: VentoseUI.UI,
          compileVNode: VentoseUI.compileVNode,
          defXVirTableConfigs: VentoseUI.defXVirTableConfigs,
          defCol: VentoseUI.defCol,
          $: VentoseUI.$,
          defItem: VentoseUI.defItem,
          resolveComponent: Vue.resolveComponent,
          App,
          dayjs
        }, {
          get(target, prop) {
            if (target.hasOwnProperty(prop)) {
              return target[prop];
            }
            if (VentoseUI.xU[prop]) {
              return VentoseUI.xU[prop];
            }
            if (target.State_UI[prop]) {
              return target.State_UI[prop];
            }
          }
        }));
        this.BussinessComponent = Vue.markRaw(_BussinessComponent);
      } finally {
        this.isLoading = false;
      }
    },
    async getBussinessComponent() {
      let scfObjSourceCode = "";
      if (!this.isFold) {
        this.BussinessComponentSourceCode = await VentoseUI.xU.asyncLoadText(this.sfcURL);
        scfObjSourceCode = VentoseUI.xU.VueLoader(this.BussinessComponentSourceCode);
      }
      this.rerun(scfObjSourceCode);
    },
    showSourceCodeDialog() {
      VentoseUI.UI.dialog.component({
        title: this.path,
        component: DialogSourceCode,
        maxmin: true,
        fullscreen: true,
        area: ["500px", "400px"],
        code: `\`\`\`js
${this.BussinessComponentSourceCode}
\`\`\``,
        hideButtons: true
      });
    }
  },
  render() {
    return Vue.createVNode("div", {
      "style": "min-height:100px;padding:20px"
    }, [Vue.withDirectives(Vue.createVNode(Vue.resolveComponent("ElCard"), {
      "class": "padding10",
      "style": this.styleContainer
    }, {
      default: () => [Vue.createVNode("div", {
        "class": "pointer",
        "onClick": this.toggleFold,
        "style": `color: rgba(0, 0, 0, 0.85); font-weight: 600; font-size:18px;`
      }, [this.title || this.sfcURL, Vue.createVNode(Vue.resolveComponent("xIcon"), {
        "icon": this.isFold ? "fold" : "unfold",
        "class": "mb10 ml10"
      }, null)]), Vue.createVNode(Vue.resolveComponent("xIcon"), {
        "icon": "rerun",
        "onClick": this.getBussinessComponent,
        "class": "mb10 pointer",
        "style": {
          position: "absolute",
          top: "48px",
          right: "60px",
          width: "16px",
          height: "16px",
          zIndex: 1
        }
      }, null), Vue.createVNode(Vue.resolveComponent("xIcon"), {
        "icon": "sourcecode",
        "onClick": this.showSourceCodeDialog,
        "class": "mb10 pointer",
        "style": {
          position: "absolute",
          top: "48px",
          right: "30px",
          width: "16px",
          height: "16px",
          zIndex: 1
        }
      }, null), this.BussinessComponent ? Vue.h(this.BussinessComponent) : null]
    }), [[Vue.resolveDirective("xloading"), this.isLoading]])]);
  }
});
const getIcon = (icon) => {
  return Vue.createVNode(Vue.resolveComponent("xIcon"), {
    "icon": icon,
    "style": "width:16px;height:100%;",
    "class": "auto-size"
  }, null);
};
const _sfc_main = Vue.defineComponent({
  name: "xMenuTree",
  props: ["tree", "authFn"],
  setup() {
    return {};
  },
  data(vm) {
    vm.setActiveMenuHighlight = VentoseUI.xU.debounce(function() {
      const openKey = vm.pathAndIdCollection[vm.currentPath];
      if (!openKey) {
        return;
      }
      vm.onOpenChange([openKey]);
      vm.arr_selectedMenuId = [openKey];
    }, 300);
    return {
      openKeys: [],
      pathAndIdCollection: {},
      arr_selectedMenuId: []
    };
  },
  watch: {
    currentPath: {
      immediate: true,
      handler() {
        if (this.setActiveMenuHighlight) {
          this.setActiveMenuHighlight();
        }
      }
    }
  },
  methods: {
    onOpenChange(openKeys) {
      if (!VentoseUI.xU.isArrayFill(openKeys)) {
        return;
      }
      const latestOpenKey = VentoseUI.xU.last(openKeys) || "";
      const openKeyArray = VentoseUI.xU.safeSplit(latestOpenKey, "###").filter((i) => i);
      const _openKeys = [];
      for (let index = 0; index < openKeyArray.length; index++) {
        const element = openKeyArray[index];
        if (index === 0) {
          _openKeys[0] = `###${element}`;
        } else {
          _openKeys[index] = `${_openKeys[index - 1]}###${element}`;
        }
      }
      this.openKeys = _openKeys;
    }
  },
  computed: {
    currentPath() {
      return this.$route.path;
    },
    subTree() {
      const vm = this;
      const treeArray = this.tree || [];
      const MenuItemRender = (currentMenuInfo, parentId) => {
        const currentId = `${parentId}###${currentMenuInfo.id}`;
        if (this.authFn) {
          if (!this.authFn(currentMenuInfo)) {
            return null;
          }
        }
        if (VentoseUI.xU.isArrayFill(currentMenuInfo.children)) {
          return Vue.createVNode(Vue.resolveComponent("aSubMenu"), {
            "key": currentId
          }, {
            icon: () => getIcon(currentMenuInfo.icon),
            title: () => currentMenuInfo.label,
            default: () => VentoseUI.xU.map(currentMenuInfo.children, (i) => MenuItemRender(i, currentId))
          });
        } else {
          vm.pathAndIdCollection[currentMenuInfo.path] = currentId;
          return Vue.createVNode(Vue.resolveComponent("elMenuItem"), {
            "key": currentId,
            "class": "flex middle"
          }, {
            icon: () => getIcon(currentMenuInfo.icon),
            title: () => currentMenuInfo.label,
            default: () => {
              if (currentMenuInfo.payload) {
                if (currentMenuInfo.payload.openType && currentMenuInfo.payload.openType === "NEW_TAB") {
                  const isDisabled = {};
                  if (!currentMenuInfo.path) {
                    isDisabled.disabled = true;
                  }
                  return Vue.createVNode("a", Vue.mergeProps({
                    "title": currentMenuInfo.label
                  }, isDisabled, {
                    "href": currentMenuInfo.path,
                    "target": "_blank",
                    "onClick": (e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      if (!currentMenuInfo.path) {
                        return;
                      }
                      currentMenuInfo.path && window.open(currentMenuInfo.path, "_blank");
                    }
                  }), [currentMenuInfo.label]);
                }
              }
              return Vue.createVNode(Vue.Fragment, null, [Vue.createVNode(Vue.resolveComponent("RouterLink"), {
                "to": currentMenuInfo.path || "/404"
              }, {
                default: () => [currentMenuInfo.label]
              })]);
            }
          });
        }
      };
      if (VentoseUI.xU.isArrayFill(treeArray)) {
        return VentoseUI.xU.map(treeArray, (i) => {
          return MenuItemRender(i, "");
        });
      } else {
        return null;
      }
    }
  },
  render() {
    return Vue.createVNode(Vue.resolveComponent("elMenu"), {
      "openKeys": this.openKeys,
      "onOpenChange": this.onOpenChange,
      "selectedKeys": this.arr_selectedMenuId,
      "onUpdate:selectedKeys": ($event) => this.arr_selectedMenuId = $event,
      "mode": "inline"
    }, {
      default: () => [this.subTree]
    });
  }
});
const appPlugins = {
  install: (app2, options) => {
    app2.use(VentoseUI.VentoseUIWithInstall, {
      appPlugins,
      dependState: options.dependState
    });
    app2.use({
      install: (app3, {
        watch
      } = {}) => {
        var _a;
        app3.component(_sfc_main.name, _sfc_main);
        app3.component("Mkit", Mkit);
        app3.component("DemoAndCode", DemoAndCode);
        app3.config.globalProperties.$t = VentoseUI.State_UI.$t;
        const link = document.getElementById("svg_assets_img");
        if (link) {
          const src = String(link.href);
          const index = ((_a = src.match(/assets(.*)/)) == null ? void 0 : _a.index) || 0;
          VentoseUI.State_UI.setBasePath(src.substring(0, index));
        }
        VentoseUI.$("html").attr("lang", VentoseUI.State_UI.language);
        watch && watch();
      }
    });
    app2.use(router);
    return app2;
  }
};
const State_App = Vue.reactive({});
document.title = "vue3+antdv+components";
Vue.createApp(App).use(appPlugins, {
  dependState: State_App
}).mount("#app");
const app = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null
}, Symbol.toStringTag, { value: "Module" }));
export {
  _sfc_main as _,
  _export_sfc as a,
  app as b
};
