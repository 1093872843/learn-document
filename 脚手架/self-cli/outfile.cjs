#!/usr/bin/env node
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/.pnpm/kleur@3.0.3/node_modules/kleur/index.js
var require_kleur = __commonJS({
  "node_modules/.pnpm/kleur@3.0.3/node_modules/kleur/index.js"(exports, module2) {
    "use strict";
    var { FORCE_COLOR, NODE_DISABLE_COLORS, TERM } = process.env;
    var $ = {
      enabled: !NODE_DISABLE_COLORS && TERM !== "dumb" && FORCE_COLOR !== "0",
      // modifiers
      reset: init2(0, 0),
      bold: init2(1, 22),
      dim: init2(2, 22),
      italic: init2(3, 23),
      underline: init2(4, 24),
      inverse: init2(7, 27),
      hidden: init2(8, 28),
      strikethrough: init2(9, 29),
      // colors
      black: init2(30, 39),
      red: init2(31, 39),
      green: init2(32, 39),
      yellow: init2(33, 39),
      blue: init2(34, 39),
      magenta: init2(35, 39),
      cyan: init2(36, 39),
      white: init2(37, 39),
      gray: init2(90, 39),
      grey: init2(90, 39),
      // background colors
      bgBlack: init2(40, 49),
      bgRed: init2(41, 49),
      bgGreen: init2(42, 49),
      bgYellow: init2(43, 49),
      bgBlue: init2(44, 49),
      bgMagenta: init2(45, 49),
      bgCyan: init2(46, 49),
      bgWhite: init2(47, 49)
    };
    function run(arr, str) {
      let i = 0, tmp, beg = "", end = "";
      for (; i < arr.length; i++) {
        tmp = arr[i];
        beg += tmp.open;
        end += tmp.close;
        if (str.includes(tmp.close)) {
          str = str.replace(tmp.rgx, tmp.close + tmp.open);
        }
      }
      return beg + str + end;
    }
    function chain(has, keys) {
      let ctx = { has, keys };
      ctx.reset = $.reset.bind(ctx);
      ctx.bold = $.bold.bind(ctx);
      ctx.dim = $.dim.bind(ctx);
      ctx.italic = $.italic.bind(ctx);
      ctx.underline = $.underline.bind(ctx);
      ctx.inverse = $.inverse.bind(ctx);
      ctx.hidden = $.hidden.bind(ctx);
      ctx.strikethrough = $.strikethrough.bind(ctx);
      ctx.black = $.black.bind(ctx);
      ctx.red = $.red.bind(ctx);
      ctx.green = $.green.bind(ctx);
      ctx.yellow = $.yellow.bind(ctx);
      ctx.blue = $.blue.bind(ctx);
      ctx.magenta = $.magenta.bind(ctx);
      ctx.cyan = $.cyan.bind(ctx);
      ctx.white = $.white.bind(ctx);
      ctx.gray = $.gray.bind(ctx);
      ctx.grey = $.grey.bind(ctx);
      ctx.bgBlack = $.bgBlack.bind(ctx);
      ctx.bgRed = $.bgRed.bind(ctx);
      ctx.bgGreen = $.bgGreen.bind(ctx);
      ctx.bgYellow = $.bgYellow.bind(ctx);
      ctx.bgBlue = $.bgBlue.bind(ctx);
      ctx.bgMagenta = $.bgMagenta.bind(ctx);
      ctx.bgCyan = $.bgCyan.bind(ctx);
      ctx.bgWhite = $.bgWhite.bind(ctx);
      return ctx;
    }
    function init2(open, close) {
      let blk = {
        open: `\x1B[${open}m`,
        close: `\x1B[${close}m`,
        rgx: new RegExp(`\\x1b\\[${close}m`, "g")
      };
      return function(txt) {
        if (this !== void 0 && this.has !== void 0) {
          this.has.includes(open) || (this.has.push(open), this.keys.push(blk));
          return txt === void 0 ? this : $.enabled ? run(this.keys, txt + "") : txt + "";
        }
        return txt === void 0 ? chain([open], [blk]) : $.enabled ? run([blk], txt + "") : txt + "";
      };
    }
    module2.exports = $;
  }
});

// node_modules/.pnpm/prompts@2.4.2/node_modules/prompts/lib/util/action.js
var require_action = __commonJS({
  "node_modules/.pnpm/prompts@2.4.2/node_modules/prompts/lib/util/action.js"(exports, module2) {
    "use strict";
    module2.exports = (key, isSelect) => {
      if (key.meta && key.name !== "escape")
        return;
      if (key.ctrl) {
        if (key.name === "a")
          return "first";
        if (key.name === "c")
          return "abort";
        if (key.name === "d")
          return "abort";
        if (key.name === "e")
          return "last";
        if (key.name === "g")
          return "reset";
      }
      if (isSelect) {
        if (key.name === "j")
          return "down";
        if (key.name === "k")
          return "up";
      }
      if (key.name === "return")
        return "submit";
      if (key.name === "enter")
        return "submit";
      if (key.name === "backspace")
        return "delete";
      if (key.name === "delete")
        return "deleteForward";
      if (key.name === "abort")
        return "abort";
      if (key.name === "escape")
        return "exit";
      if (key.name === "tab")
        return "next";
      if (key.name === "pagedown")
        return "nextPage";
      if (key.name === "pageup")
        return "prevPage";
      if (key.name === "home")
        return "home";
      if (key.name === "end")
        return "end";
      if (key.name === "up")
        return "up";
      if (key.name === "down")
        return "down";
      if (key.name === "right")
        return "right";
      if (key.name === "left")
        return "left";
      return false;
    };
  }
});

// node_modules/.pnpm/prompts@2.4.2/node_modules/prompts/lib/util/strip.js
var require_strip = __commonJS({
  "node_modules/.pnpm/prompts@2.4.2/node_modules/prompts/lib/util/strip.js"(exports, module2) {
    "use strict";
    module2.exports = (str) => {
      const pattern = [
        "[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)",
        "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PRZcf-ntqry=><~]))"
      ].join("|");
      const RGX = new RegExp(pattern, "g");
      return typeof str === "string" ? str.replace(RGX, "") : str;
    };
  }
});

// node_modules/.pnpm/sisteransi@1.0.5/node_modules/sisteransi/src/index.js
var require_src = __commonJS({
  "node_modules/.pnpm/sisteransi@1.0.5/node_modules/sisteransi/src/index.js"(exports, module2) {
    "use strict";
    var ESC = "\x1B";
    var CSI = `${ESC}[`;
    var beep = "\x07";
    var cursor = {
      to(x, y) {
        if (!y)
          return `${CSI}${x + 1}G`;
        return `${CSI}${y + 1};${x + 1}H`;
      },
      move(x, y) {
        let ret = "";
        if (x < 0)
          ret += `${CSI}${-x}D`;
        else if (x > 0)
          ret += `${CSI}${x}C`;
        if (y < 0)
          ret += `${CSI}${-y}A`;
        else if (y > 0)
          ret += `${CSI}${y}B`;
        return ret;
      },
      up: (count = 1) => `${CSI}${count}A`,
      down: (count = 1) => `${CSI}${count}B`,
      forward: (count = 1) => `${CSI}${count}C`,
      backward: (count = 1) => `${CSI}${count}D`,
      nextLine: (count = 1) => `${CSI}E`.repeat(count),
      prevLine: (count = 1) => `${CSI}F`.repeat(count),
      left: `${CSI}G`,
      hide: `${CSI}?25l`,
      show: `${CSI}?25h`,
      save: `${ESC}7`,
      restore: `${ESC}8`
    };
    var scroll = {
      up: (count = 1) => `${CSI}S`.repeat(count),
      down: (count = 1) => `${CSI}T`.repeat(count)
    };
    var erase = {
      screen: `${CSI}2J`,
      up: (count = 1) => `${CSI}1J`.repeat(count),
      down: (count = 1) => `${CSI}J`.repeat(count),
      line: `${CSI}2K`,
      lineEnd: `${CSI}K`,
      lineStart: `${CSI}1K`,
      lines(count) {
        let clear = "";
        for (let i = 0; i < count; i++)
          clear += this.line + (i < count - 1 ? cursor.up() : "");
        if (count)
          clear += cursor.left;
        return clear;
      }
    };
    module2.exports = { cursor, scroll, erase, beep };
  }
});

// node_modules/.pnpm/prompts@2.4.2/node_modules/prompts/lib/util/clear.js
var require_clear = __commonJS({
  "node_modules/.pnpm/prompts@2.4.2/node_modules/prompts/lib/util/clear.js"(exports, module2) {
    "use strict";
    var strip = require_strip();
    var { erase, cursor } = require_src();
    var width = (str) => [...strip(str)].length;
    module2.exports = function(prompt, perLine) {
      if (!perLine)
        return erase.line + cursor.to(0);
      let rows = 0;
      const lines = prompt.split(/\r?\n/);
      for (let line of lines) {
        rows += 1 + Math.floor(Math.max(width(line) - 1, 0) / perLine);
      }
      return erase.lines(rows);
    };
  }
});

// node_modules/.pnpm/prompts@2.4.2/node_modules/prompts/lib/util/figures.js
var require_figures = __commonJS({
  "node_modules/.pnpm/prompts@2.4.2/node_modules/prompts/lib/util/figures.js"(exports, module2) {
    "use strict";
    var main = {
      arrowUp: "\u2191",
      arrowDown: "\u2193",
      arrowLeft: "\u2190",
      arrowRight: "\u2192",
      radioOn: "\u25C9",
      radioOff: "\u25EF",
      tick: "\u2714",
      cross: "\u2716",
      ellipsis: "\u2026",
      pointerSmall: "\u203A",
      line: "\u2500",
      pointer: "\u276F"
    };
    var win = {
      arrowUp: main.arrowUp,
      arrowDown: main.arrowDown,
      arrowLeft: main.arrowLeft,
      arrowRight: main.arrowRight,
      radioOn: "(*)",
      radioOff: "( )",
      tick: "\u221A",
      cross: "\xD7",
      ellipsis: "...",
      pointerSmall: "\xBB",
      line: "\u2500",
      pointer: ">"
    };
    var figures = process.platform === "win32" ? win : main;
    module2.exports = figures;
  }
});

// node_modules/.pnpm/prompts@2.4.2/node_modules/prompts/lib/util/style.js
var require_style = __commonJS({
  "node_modules/.pnpm/prompts@2.4.2/node_modules/prompts/lib/util/style.js"(exports, module2) {
    "use strict";
    var c = require_kleur();
    var figures = require_figures();
    var styles = Object.freeze({
      password: { scale: 1, render: (input) => "*".repeat(input.length) },
      emoji: { scale: 2, render: (input) => "\u{1F603}".repeat(input.length) },
      invisible: { scale: 0, render: (input) => "" },
      default: { scale: 1, render: (input) => `${input}` }
    });
    var render = (type) => styles[type] || styles.default;
    var symbols = Object.freeze({
      aborted: c.red(figures.cross),
      done: c.green(figures.tick),
      exited: c.yellow(figures.cross),
      default: c.cyan("?")
    });
    var symbol = (done, aborted, exited) => aborted ? symbols.aborted : exited ? symbols.exited : done ? symbols.done : symbols.default;
    var delimiter = (completing) => c.gray(completing ? figures.ellipsis : figures.pointerSmall);
    var item = (expandable, expanded) => c.gray(expandable ? expanded ? figures.pointerSmall : "+" : figures.line);
    module2.exports = {
      styles,
      render,
      symbols,
      symbol,
      delimiter,
      item
    };
  }
});

// node_modules/.pnpm/prompts@2.4.2/node_modules/prompts/lib/util/lines.js
var require_lines = __commonJS({
  "node_modules/.pnpm/prompts@2.4.2/node_modules/prompts/lib/util/lines.js"(exports, module2) {
    "use strict";
    var strip = require_strip();
    module2.exports = function(msg, perLine) {
      let lines = String(strip(msg) || "").split(/\r?\n/);
      if (!perLine)
        return lines.length;
      return lines.map((l) => Math.ceil(l.length / perLine)).reduce((a, b) => a + b);
    };
  }
});

// node_modules/.pnpm/prompts@2.4.2/node_modules/prompts/lib/util/wrap.js
var require_wrap = __commonJS({
  "node_modules/.pnpm/prompts@2.4.2/node_modules/prompts/lib/util/wrap.js"(exports, module2) {
    "use strict";
    module2.exports = (msg, opts = {}) => {
      const tab = Number.isSafeInteger(parseInt(opts.margin)) ? new Array(parseInt(opts.margin)).fill(" ").join("") : opts.margin || "";
      const width = opts.width;
      return (msg || "").split(/\r?\n/g).map((line) => line.split(/\s+/g).reduce((arr, w) => {
        if (w.length + tab.length >= width || arr[arr.length - 1].length + w.length + 1 < width)
          arr[arr.length - 1] += ` ${w}`;
        else
          arr.push(`${tab}${w}`);
        return arr;
      }, [tab]).join("\n")).join("\n");
    };
  }
});

// node_modules/.pnpm/prompts@2.4.2/node_modules/prompts/lib/util/entriesToDisplay.js
var require_entriesToDisplay = __commonJS({
  "node_modules/.pnpm/prompts@2.4.2/node_modules/prompts/lib/util/entriesToDisplay.js"(exports, module2) {
    "use strict";
    module2.exports = (cursor, total, maxVisible) => {
      maxVisible = maxVisible || total;
      let startIndex = Math.min(total - maxVisible, cursor - Math.floor(maxVisible / 2));
      if (startIndex < 0)
        startIndex = 0;
      let endIndex = Math.min(startIndex + maxVisible, total);
      return { startIndex, endIndex };
    };
  }
});

// node_modules/.pnpm/prompts@2.4.2/node_modules/prompts/lib/util/index.js
var require_util = __commonJS({
  "node_modules/.pnpm/prompts@2.4.2/node_modules/prompts/lib/util/index.js"(exports, module2) {
    "use strict";
    module2.exports = {
      action: require_action(),
      clear: require_clear(),
      style: require_style(),
      strip: require_strip(),
      figures: require_figures(),
      lines: require_lines(),
      wrap: require_wrap(),
      entriesToDisplay: require_entriesToDisplay()
    };
  }
});

// node_modules/.pnpm/prompts@2.4.2/node_modules/prompts/lib/elements/prompt.js
var require_prompt = __commonJS({
  "node_modules/.pnpm/prompts@2.4.2/node_modules/prompts/lib/elements/prompt.js"(exports, module2) {
    "use strict";
    var readline = require("readline");
    var { action } = require_util();
    var EventEmitter = require("events");
    var { beep, cursor } = require_src();
    var color = require_kleur();
    var Prompt = class extends EventEmitter {
      constructor(opts = {}) {
        super();
        this.firstRender = true;
        this.in = opts.stdin || process.stdin;
        this.out = opts.stdout || process.stdout;
        this.onRender = (opts.onRender || (() => void 0)).bind(this);
        const rl = readline.createInterface({ input: this.in, escapeCodeTimeout: 50 });
        readline.emitKeypressEvents(this.in, rl);
        if (this.in.isTTY)
          this.in.setRawMode(true);
        const isSelect = ["SelectPrompt", "MultiselectPrompt"].indexOf(this.constructor.name) > -1;
        const keypress = (str, key) => {
          let a = action(key, isSelect);
          if (a === false) {
            this._ && this._(str, key);
          } else if (typeof this[a] === "function") {
            this[a](key);
          } else {
            this.bell();
          }
        };
        this.close = () => {
          this.out.write(cursor.show);
          this.in.removeListener("keypress", keypress);
          if (this.in.isTTY)
            this.in.setRawMode(false);
          rl.close();
          this.emit(this.aborted ? "abort" : this.exited ? "exit" : "submit", this.value);
          this.closed = true;
        };
        this.in.on("keypress", keypress);
      }
      fire() {
        this.emit("state", {
          value: this.value,
          aborted: !!this.aborted,
          exited: !!this.exited
        });
      }
      bell() {
        this.out.write(beep);
      }
      render() {
        this.onRender(color);
        if (this.firstRender)
          this.firstRender = false;
      }
    };
    module2.exports = Prompt;
  }
});

// node_modules/.pnpm/prompts@2.4.2/node_modules/prompts/lib/elements/text.js
var require_text = __commonJS({
  "node_modules/.pnpm/prompts@2.4.2/node_modules/prompts/lib/elements/text.js"(exports, module2) {
    var color = require_kleur();
    var Prompt = require_prompt();
    var { erase, cursor } = require_src();
    var { style, clear, lines, figures } = require_util();
    var TextPrompt = class extends Prompt {
      constructor(opts = {}) {
        super(opts);
        this.transform = style.render(opts.style);
        this.scale = this.transform.scale;
        this.msg = opts.message;
        this.initial = opts.initial || ``;
        this.validator = opts.validate || (() => true);
        this.value = ``;
        this.errorMsg = opts.error || `Please Enter A Valid Value`;
        this.cursor = Number(!!this.initial);
        this.cursorOffset = 0;
        this.clear = clear(``, this.out.columns);
        this.render();
      }
      set value(v) {
        if (!v && this.initial) {
          this.placeholder = true;
          this.rendered = color.gray(this.transform.render(this.initial));
        } else {
          this.placeholder = false;
          this.rendered = this.transform.render(v);
        }
        this._value = v;
        this.fire();
      }
      get value() {
        return this._value;
      }
      reset() {
        this.value = ``;
        this.cursor = Number(!!this.initial);
        this.cursorOffset = 0;
        this.fire();
        this.render();
      }
      exit() {
        this.abort();
      }
      abort() {
        this.value = this.value || this.initial;
        this.done = this.aborted = true;
        this.error = false;
        this.red = false;
        this.fire();
        this.render();
        this.out.write("\n");
        this.close();
      }
      async validate() {
        let valid = await this.validator(this.value);
        if (typeof valid === `string`) {
          this.errorMsg = valid;
          valid = false;
        }
        this.error = !valid;
      }
      async submit() {
        this.value = this.value || this.initial;
        this.cursorOffset = 0;
        this.cursor = this.rendered.length;
        await this.validate();
        if (this.error) {
          this.red = true;
          this.fire();
          this.render();
          return;
        }
        this.done = true;
        this.aborted = false;
        this.fire();
        this.render();
        this.out.write("\n");
        this.close();
      }
      next() {
        if (!this.placeholder)
          return this.bell();
        this.value = this.initial;
        this.cursor = this.rendered.length;
        this.fire();
        this.render();
      }
      moveCursor(n) {
        if (this.placeholder)
          return;
        this.cursor = this.cursor + n;
        this.cursorOffset += n;
      }
      _(c, key) {
        let s1 = this.value.slice(0, this.cursor);
        let s2 = this.value.slice(this.cursor);
        this.value = `${s1}${c}${s2}`;
        this.red = false;
        this.cursor = this.placeholder ? 0 : s1.length + 1;
        this.render();
      }
      delete() {
        if (this.isCursorAtStart())
          return this.bell();
        let s1 = this.value.slice(0, this.cursor - 1);
        let s2 = this.value.slice(this.cursor);
        this.value = `${s1}${s2}`;
        this.red = false;
        if (this.isCursorAtStart()) {
          this.cursorOffset = 0;
        } else {
          this.cursorOffset++;
          this.moveCursor(-1);
        }
        this.render();
      }
      deleteForward() {
        if (this.cursor * this.scale >= this.rendered.length || this.placeholder)
          return this.bell();
        let s1 = this.value.slice(0, this.cursor);
        let s2 = this.value.slice(this.cursor + 1);
        this.value = `${s1}${s2}`;
        this.red = false;
        if (this.isCursorAtEnd()) {
          this.cursorOffset = 0;
        } else {
          this.cursorOffset++;
        }
        this.render();
      }
      first() {
        this.cursor = 0;
        this.render();
      }
      last() {
        this.cursor = this.value.length;
        this.render();
      }
      left() {
        if (this.cursor <= 0 || this.placeholder)
          return this.bell();
        this.moveCursor(-1);
        this.render();
      }
      right() {
        if (this.cursor * this.scale >= this.rendered.length || this.placeholder)
          return this.bell();
        this.moveCursor(1);
        this.render();
      }
      isCursorAtStart() {
        return this.cursor === 0 || this.placeholder && this.cursor === 1;
      }
      isCursorAtEnd() {
        return this.cursor === this.rendered.length || this.placeholder && this.cursor === this.rendered.length + 1;
      }
      render() {
        if (this.closed)
          return;
        if (!this.firstRender) {
          if (this.outputError)
            this.out.write(cursor.down(lines(this.outputError, this.out.columns) - 1) + clear(this.outputError, this.out.columns));
          this.out.write(clear(this.outputText, this.out.columns));
        }
        super.render();
        this.outputError = "";
        this.outputText = [
          style.symbol(this.done, this.aborted),
          color.bold(this.msg),
          style.delimiter(this.done),
          this.red ? color.red(this.rendered) : this.rendered
        ].join(` `);
        if (this.error) {
          this.outputError += this.errorMsg.split(`
`).reduce((a, l, i) => a + `
${i ? " " : figures.pointerSmall} ${color.red().italic(l)}`, ``);
        }
        this.out.write(erase.line + cursor.to(0) + this.outputText + cursor.save + this.outputError + cursor.restore + cursor.move(this.cursorOffset, 0));
      }
    };
    module2.exports = TextPrompt;
  }
});

// node_modules/.pnpm/prompts@2.4.2/node_modules/prompts/lib/elements/select.js
var require_select = __commonJS({
  "node_modules/.pnpm/prompts@2.4.2/node_modules/prompts/lib/elements/select.js"(exports, module2) {
    "use strict";
    var color = require_kleur();
    var Prompt = require_prompt();
    var { style, clear, figures, wrap, entriesToDisplay } = require_util();
    var { cursor } = require_src();
    var SelectPrompt = class extends Prompt {
      constructor(opts = {}) {
        super(opts);
        this.msg = opts.message;
        this.hint = opts.hint || "- Use arrow-keys. Return to submit.";
        this.warn = opts.warn || "- This option is disabled";
        this.cursor = opts.initial || 0;
        this.choices = opts.choices.map((ch, idx) => {
          if (typeof ch === "string")
            ch = { title: ch, value: idx };
          return {
            title: ch && (ch.title || ch.value || ch),
            value: ch && (ch.value === void 0 ? idx : ch.value),
            description: ch && ch.description,
            selected: ch && ch.selected,
            disabled: ch && ch.disabled
          };
        });
        this.optionsPerPage = opts.optionsPerPage || 10;
        this.value = (this.choices[this.cursor] || {}).value;
        this.clear = clear("", this.out.columns);
        this.render();
      }
      moveCursor(n) {
        this.cursor = n;
        this.value = this.choices[n].value;
        this.fire();
      }
      reset() {
        this.moveCursor(0);
        this.fire();
        this.render();
      }
      exit() {
        this.abort();
      }
      abort() {
        this.done = this.aborted = true;
        this.fire();
        this.render();
        this.out.write("\n");
        this.close();
      }
      submit() {
        if (!this.selection.disabled) {
          this.done = true;
          this.aborted = false;
          this.fire();
          this.render();
          this.out.write("\n");
          this.close();
        } else
          this.bell();
      }
      first() {
        this.moveCursor(0);
        this.render();
      }
      last() {
        this.moveCursor(this.choices.length - 1);
        this.render();
      }
      up() {
        if (this.cursor === 0) {
          this.moveCursor(this.choices.length - 1);
        } else {
          this.moveCursor(this.cursor - 1);
        }
        this.render();
      }
      down() {
        if (this.cursor === this.choices.length - 1) {
          this.moveCursor(0);
        } else {
          this.moveCursor(this.cursor + 1);
        }
        this.render();
      }
      next() {
        this.moveCursor((this.cursor + 1) % this.choices.length);
        this.render();
      }
      _(c, key) {
        if (c === " ")
          return this.submit();
      }
      get selection() {
        return this.choices[this.cursor];
      }
      render() {
        if (this.closed)
          return;
        if (this.firstRender)
          this.out.write(cursor.hide);
        else
          this.out.write(clear(this.outputText, this.out.columns));
        super.render();
        let { startIndex, endIndex } = entriesToDisplay(this.cursor, this.choices.length, this.optionsPerPage);
        this.outputText = [
          style.symbol(this.done, this.aborted),
          color.bold(this.msg),
          style.delimiter(false),
          this.done ? this.selection.title : this.selection.disabled ? color.yellow(this.warn) : color.gray(this.hint)
        ].join(" ");
        if (!this.done) {
          this.outputText += "\n";
          for (let i = startIndex; i < endIndex; i++) {
            let title, prefix, desc = "", v = this.choices[i];
            if (i === startIndex && startIndex > 0) {
              prefix = figures.arrowUp;
            } else if (i === endIndex - 1 && endIndex < this.choices.length) {
              prefix = figures.arrowDown;
            } else {
              prefix = " ";
            }
            if (v.disabled) {
              title = this.cursor === i ? color.gray().underline(v.title) : color.strikethrough().gray(v.title);
              prefix = (this.cursor === i ? color.bold().gray(figures.pointer) + " " : "  ") + prefix;
            } else {
              title = this.cursor === i ? color.cyan().underline(v.title) : v.title;
              prefix = (this.cursor === i ? color.cyan(figures.pointer) + " " : "  ") + prefix;
              if (v.description && this.cursor === i) {
                desc = ` - ${v.description}`;
                if (prefix.length + title.length + desc.length >= this.out.columns || v.description.split(/\r?\n/).length > 1) {
                  desc = "\n" + wrap(v.description, { margin: 3, width: this.out.columns });
                }
              }
            }
            this.outputText += `${prefix} ${title}${color.gray(desc)}
`;
          }
        }
        this.out.write(this.outputText);
      }
    };
    module2.exports = SelectPrompt;
  }
});

// node_modules/.pnpm/prompts@2.4.2/node_modules/prompts/lib/elements/toggle.js
var require_toggle = __commonJS({
  "node_modules/.pnpm/prompts@2.4.2/node_modules/prompts/lib/elements/toggle.js"(exports, module2) {
    var color = require_kleur();
    var Prompt = require_prompt();
    var { style, clear } = require_util();
    var { cursor, erase } = require_src();
    var TogglePrompt = class extends Prompt {
      constructor(opts = {}) {
        super(opts);
        this.msg = opts.message;
        this.value = !!opts.initial;
        this.active = opts.active || "on";
        this.inactive = opts.inactive || "off";
        this.initialValue = this.value;
        this.render();
      }
      reset() {
        this.value = this.initialValue;
        this.fire();
        this.render();
      }
      exit() {
        this.abort();
      }
      abort() {
        this.done = this.aborted = true;
        this.fire();
        this.render();
        this.out.write("\n");
        this.close();
      }
      submit() {
        this.done = true;
        this.aborted = false;
        this.fire();
        this.render();
        this.out.write("\n");
        this.close();
      }
      deactivate() {
        if (this.value === false)
          return this.bell();
        this.value = false;
        this.render();
      }
      activate() {
        if (this.value === true)
          return this.bell();
        this.value = true;
        this.render();
      }
      delete() {
        this.deactivate();
      }
      left() {
        this.deactivate();
      }
      right() {
        this.activate();
      }
      down() {
        this.deactivate();
      }
      up() {
        this.activate();
      }
      next() {
        this.value = !this.value;
        this.fire();
        this.render();
      }
      _(c, key) {
        if (c === " ") {
          this.value = !this.value;
        } else if (c === "1") {
          this.value = true;
        } else if (c === "0") {
          this.value = false;
        } else
          return this.bell();
        this.render();
      }
      render() {
        if (this.closed)
          return;
        if (this.firstRender)
          this.out.write(cursor.hide);
        else
          this.out.write(clear(this.outputText, this.out.columns));
        super.render();
        this.outputText = [
          style.symbol(this.done, this.aborted),
          color.bold(this.msg),
          style.delimiter(this.done),
          this.value ? this.inactive : color.cyan().underline(this.inactive),
          color.gray("/"),
          this.value ? color.cyan().underline(this.active) : this.active
        ].join(" ");
        this.out.write(erase.line + cursor.to(0) + this.outputText);
      }
    };
    module2.exports = TogglePrompt;
  }
});

// node_modules/.pnpm/prompts@2.4.2/node_modules/prompts/lib/dateparts/datepart.js
var require_datepart = __commonJS({
  "node_modules/.pnpm/prompts@2.4.2/node_modules/prompts/lib/dateparts/datepart.js"(exports, module2) {
    "use strict";
    var DatePart = class _DatePart {
      constructor({ token, date, parts, locales }) {
        this.token = token;
        this.date = date || /* @__PURE__ */ new Date();
        this.parts = parts || [this];
        this.locales = locales || {};
      }
      up() {
      }
      down() {
      }
      next() {
        const currentIdx = this.parts.indexOf(this);
        return this.parts.find((part, idx) => idx > currentIdx && part instanceof _DatePart);
      }
      setTo(val) {
      }
      prev() {
        let parts = [].concat(this.parts).reverse();
        const currentIdx = parts.indexOf(this);
        return parts.find((part, idx) => idx > currentIdx && part instanceof _DatePart);
      }
      toString() {
        return String(this.date);
      }
    };
    module2.exports = DatePart;
  }
});

// node_modules/.pnpm/prompts@2.4.2/node_modules/prompts/lib/dateparts/meridiem.js
var require_meridiem = __commonJS({
  "node_modules/.pnpm/prompts@2.4.2/node_modules/prompts/lib/dateparts/meridiem.js"(exports, module2) {
    "use strict";
    var DatePart = require_datepart();
    var Meridiem = class extends DatePart {
      constructor(opts = {}) {
        super(opts);
      }
      up() {
        this.date.setHours((this.date.getHours() + 12) % 24);
      }
      down() {
        this.up();
      }
      toString() {
        let meridiem = this.date.getHours() > 12 ? "pm" : "am";
        return /\A/.test(this.token) ? meridiem.toUpperCase() : meridiem;
      }
    };
    module2.exports = Meridiem;
  }
});

// node_modules/.pnpm/prompts@2.4.2/node_modules/prompts/lib/dateparts/day.js
var require_day = __commonJS({
  "node_modules/.pnpm/prompts@2.4.2/node_modules/prompts/lib/dateparts/day.js"(exports, module2) {
    "use strict";
    var DatePart = require_datepart();
    var pos = (n) => {
      n = n % 10;
      return n === 1 ? "st" : n === 2 ? "nd" : n === 3 ? "rd" : "th";
    };
    var Day = class extends DatePart {
      constructor(opts = {}) {
        super(opts);
      }
      up() {
        this.date.setDate(this.date.getDate() + 1);
      }
      down() {
        this.date.setDate(this.date.getDate() - 1);
      }
      setTo(val) {
        this.date.setDate(parseInt(val.substr(-2)));
      }
      toString() {
        let date = this.date.getDate();
        let day = this.date.getDay();
        return this.token === "DD" ? String(date).padStart(2, "0") : this.token === "Do" ? date + pos(date) : this.token === "d" ? day + 1 : this.token === "ddd" ? this.locales.weekdaysShort[day] : this.token === "dddd" ? this.locales.weekdays[day] : date;
      }
    };
    module2.exports = Day;
  }
});

// node_modules/.pnpm/prompts@2.4.2/node_modules/prompts/lib/dateparts/hours.js
var require_hours = __commonJS({
  "node_modules/.pnpm/prompts@2.4.2/node_modules/prompts/lib/dateparts/hours.js"(exports, module2) {
    "use strict";
    var DatePart = require_datepart();
    var Hours = class extends DatePart {
      constructor(opts = {}) {
        super(opts);
      }
      up() {
        this.date.setHours(this.date.getHours() + 1);
      }
      down() {
        this.date.setHours(this.date.getHours() - 1);
      }
      setTo(val) {
        this.date.setHours(parseInt(val.substr(-2)));
      }
      toString() {
        let hours = this.date.getHours();
        if (/h/.test(this.token))
          hours = hours % 12 || 12;
        return this.token.length > 1 ? String(hours).padStart(2, "0") : hours;
      }
    };
    module2.exports = Hours;
  }
});

// node_modules/.pnpm/prompts@2.4.2/node_modules/prompts/lib/dateparts/milliseconds.js
var require_milliseconds = __commonJS({
  "node_modules/.pnpm/prompts@2.4.2/node_modules/prompts/lib/dateparts/milliseconds.js"(exports, module2) {
    "use strict";
    var DatePart = require_datepart();
    var Milliseconds = class extends DatePart {
      constructor(opts = {}) {
        super(opts);
      }
      up() {
        this.date.setMilliseconds(this.date.getMilliseconds() + 1);
      }
      down() {
        this.date.setMilliseconds(this.date.getMilliseconds() - 1);
      }
      setTo(val) {
        this.date.setMilliseconds(parseInt(val.substr(-this.token.length)));
      }
      toString() {
        return String(this.date.getMilliseconds()).padStart(4, "0").substr(0, this.token.length);
      }
    };
    module2.exports = Milliseconds;
  }
});

// node_modules/.pnpm/prompts@2.4.2/node_modules/prompts/lib/dateparts/minutes.js
var require_minutes = __commonJS({
  "node_modules/.pnpm/prompts@2.4.2/node_modules/prompts/lib/dateparts/minutes.js"(exports, module2) {
    "use strict";
    var DatePart = require_datepart();
    var Minutes = class extends DatePart {
      constructor(opts = {}) {
        super(opts);
      }
      up() {
        this.date.setMinutes(this.date.getMinutes() + 1);
      }
      down() {
        this.date.setMinutes(this.date.getMinutes() - 1);
      }
      setTo(val) {
        this.date.setMinutes(parseInt(val.substr(-2)));
      }
      toString() {
        let m = this.date.getMinutes();
        return this.token.length > 1 ? String(m).padStart(2, "0") : m;
      }
    };
    module2.exports = Minutes;
  }
});

// node_modules/.pnpm/prompts@2.4.2/node_modules/prompts/lib/dateparts/month.js
var require_month = __commonJS({
  "node_modules/.pnpm/prompts@2.4.2/node_modules/prompts/lib/dateparts/month.js"(exports, module2) {
    "use strict";
    var DatePart = require_datepart();
    var Month = class extends DatePart {
      constructor(opts = {}) {
        super(opts);
      }
      up() {
        this.date.setMonth(this.date.getMonth() + 1);
      }
      down() {
        this.date.setMonth(this.date.getMonth() - 1);
      }
      setTo(val) {
        val = parseInt(val.substr(-2)) - 1;
        this.date.setMonth(val < 0 ? 0 : val);
      }
      toString() {
        let month = this.date.getMonth();
        let tl = this.token.length;
        return tl === 2 ? String(month + 1).padStart(2, "0") : tl === 3 ? this.locales.monthsShort[month] : tl === 4 ? this.locales.months[month] : String(month + 1);
      }
    };
    module2.exports = Month;
  }
});

// node_modules/.pnpm/prompts@2.4.2/node_modules/prompts/lib/dateparts/seconds.js
var require_seconds = __commonJS({
  "node_modules/.pnpm/prompts@2.4.2/node_modules/prompts/lib/dateparts/seconds.js"(exports, module2) {
    "use strict";
    var DatePart = require_datepart();
    var Seconds = class extends DatePart {
      constructor(opts = {}) {
        super(opts);
      }
      up() {
        this.date.setSeconds(this.date.getSeconds() + 1);
      }
      down() {
        this.date.setSeconds(this.date.getSeconds() - 1);
      }
      setTo(val) {
        this.date.setSeconds(parseInt(val.substr(-2)));
      }
      toString() {
        let s = this.date.getSeconds();
        return this.token.length > 1 ? String(s).padStart(2, "0") : s;
      }
    };
    module2.exports = Seconds;
  }
});

// node_modules/.pnpm/prompts@2.4.2/node_modules/prompts/lib/dateparts/year.js
var require_year = __commonJS({
  "node_modules/.pnpm/prompts@2.4.2/node_modules/prompts/lib/dateparts/year.js"(exports, module2) {
    "use strict";
    var DatePart = require_datepart();
    var Year = class extends DatePart {
      constructor(opts = {}) {
        super(opts);
      }
      up() {
        this.date.setFullYear(this.date.getFullYear() + 1);
      }
      down() {
        this.date.setFullYear(this.date.getFullYear() - 1);
      }
      setTo(val) {
        this.date.setFullYear(val.substr(-4));
      }
      toString() {
        let year = String(this.date.getFullYear()).padStart(4, "0");
        return this.token.length === 2 ? year.substr(-2) : year;
      }
    };
    module2.exports = Year;
  }
});

// node_modules/.pnpm/prompts@2.4.2/node_modules/prompts/lib/dateparts/index.js
var require_dateparts = __commonJS({
  "node_modules/.pnpm/prompts@2.4.2/node_modules/prompts/lib/dateparts/index.js"(exports, module2) {
    "use strict";
    module2.exports = {
      DatePart: require_datepart(),
      Meridiem: require_meridiem(),
      Day: require_day(),
      Hours: require_hours(),
      Milliseconds: require_milliseconds(),
      Minutes: require_minutes(),
      Month: require_month(),
      Seconds: require_seconds(),
      Year: require_year()
    };
  }
});

// node_modules/.pnpm/prompts@2.4.2/node_modules/prompts/lib/elements/date.js
var require_date = __commonJS({
  "node_modules/.pnpm/prompts@2.4.2/node_modules/prompts/lib/elements/date.js"(exports, module2) {
    "use strict";
    var color = require_kleur();
    var Prompt = require_prompt();
    var { style, clear, figures } = require_util();
    var { erase, cursor } = require_src();
    var { DatePart, Meridiem, Day, Hours, Milliseconds, Minutes, Month, Seconds, Year } = require_dateparts();
    var regex = /\\(.)|"((?:\\["\\]|[^"])+)"|(D[Do]?|d{3,4}|d)|(M{1,4})|(YY(?:YY)?)|([aA])|([Hh]{1,2})|(m{1,2})|(s{1,2})|(S{1,4})|./g;
    var regexGroups = {
      1: ({ token }) => token.replace(/\\(.)/g, "$1"),
      2: (opts) => new Day(opts),
      // Day // TODO
      3: (opts) => new Month(opts),
      // Month
      4: (opts) => new Year(opts),
      // Year
      5: (opts) => new Meridiem(opts),
      // AM/PM // TODO (special)
      6: (opts) => new Hours(opts),
      // Hours
      7: (opts) => new Minutes(opts),
      // Minutes
      8: (opts) => new Seconds(opts),
      // Seconds
      9: (opts) => new Milliseconds(opts)
      // Fractional seconds
    };
    var dfltLocales = {
      months: "January,February,March,April,May,June,July,August,September,October,November,December".split(","),
      monthsShort: "Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec".split(","),
      weekdays: "Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday".split(","),
      weekdaysShort: "Sun,Mon,Tue,Wed,Thu,Fri,Sat".split(",")
    };
    var DatePrompt = class extends Prompt {
      constructor(opts = {}) {
        super(opts);
        this.msg = opts.message;
        this.cursor = 0;
        this.typed = "";
        this.locales = Object.assign(dfltLocales, opts.locales);
        this._date = opts.initial || /* @__PURE__ */ new Date();
        this.errorMsg = opts.error || "Please Enter A Valid Value";
        this.validator = opts.validate || (() => true);
        this.mask = opts.mask || "YYYY-MM-DD HH:mm:ss";
        this.clear = clear("", this.out.columns);
        this.render();
      }
      get value() {
        return this.date;
      }
      get date() {
        return this._date;
      }
      set date(date) {
        if (date)
          this._date.setTime(date.getTime());
      }
      set mask(mask) {
        let result;
        this.parts = [];
        while (result = regex.exec(mask)) {
          let match = result.shift();
          let idx = result.findIndex((gr) => gr != null);
          this.parts.push(idx in regexGroups ? regexGroups[idx]({ token: result[idx] || match, date: this.date, parts: this.parts, locales: this.locales }) : result[idx] || match);
        }
        let parts = this.parts.reduce((arr, i) => {
          if (typeof i === "string" && typeof arr[arr.length - 1] === "string")
            arr[arr.length - 1] += i;
          else
            arr.push(i);
          return arr;
        }, []);
        this.parts.splice(0);
        this.parts.push(...parts);
        this.reset();
      }
      moveCursor(n) {
        this.typed = "";
        this.cursor = n;
        this.fire();
      }
      reset() {
        this.moveCursor(this.parts.findIndex((p) => p instanceof DatePart));
        this.fire();
        this.render();
      }
      exit() {
        this.abort();
      }
      abort() {
        this.done = this.aborted = true;
        this.error = false;
        this.fire();
        this.render();
        this.out.write("\n");
        this.close();
      }
      async validate() {
        let valid = await this.validator(this.value);
        if (typeof valid === "string") {
          this.errorMsg = valid;
          valid = false;
        }
        this.error = !valid;
      }
      async submit() {
        await this.validate();
        if (this.error) {
          this.color = "red";
          this.fire();
          this.render();
          return;
        }
        this.done = true;
        this.aborted = false;
        this.fire();
        this.render();
        this.out.write("\n");
        this.close();
      }
      up() {
        this.typed = "";
        this.parts[this.cursor].up();
        this.render();
      }
      down() {
        this.typed = "";
        this.parts[this.cursor].down();
        this.render();
      }
      left() {
        let prev = this.parts[this.cursor].prev();
        if (prev == null)
          return this.bell();
        this.moveCursor(this.parts.indexOf(prev));
        this.render();
      }
      right() {
        let next = this.parts[this.cursor].next();
        if (next == null)
          return this.bell();
        this.moveCursor(this.parts.indexOf(next));
        this.render();
      }
      next() {
        let next = this.parts[this.cursor].next();
        this.moveCursor(next ? this.parts.indexOf(next) : this.parts.findIndex((part) => part instanceof DatePart));
        this.render();
      }
      _(c) {
        if (/\d/.test(c)) {
          this.typed += c;
          this.parts[this.cursor].setTo(this.typed);
          this.render();
        }
      }
      render() {
        if (this.closed)
          return;
        if (this.firstRender)
          this.out.write(cursor.hide);
        else
          this.out.write(clear(this.outputText, this.out.columns));
        super.render();
        this.outputText = [
          style.symbol(this.done, this.aborted),
          color.bold(this.msg),
          style.delimiter(false),
          this.parts.reduce((arr, p, idx) => arr.concat(idx === this.cursor && !this.done ? color.cyan().underline(p.toString()) : p), []).join("")
        ].join(" ");
        if (this.error) {
          this.outputText += this.errorMsg.split("\n").reduce(
            (a, l, i) => a + `
${i ? ` ` : figures.pointerSmall} ${color.red().italic(l)}`,
            ``
          );
        }
        this.out.write(erase.line + cursor.to(0) + this.outputText);
      }
    };
    module2.exports = DatePrompt;
  }
});

// node_modules/.pnpm/prompts@2.4.2/node_modules/prompts/lib/elements/number.js
var require_number = __commonJS({
  "node_modules/.pnpm/prompts@2.4.2/node_modules/prompts/lib/elements/number.js"(exports, module2) {
    var color = require_kleur();
    var Prompt = require_prompt();
    var { cursor, erase } = require_src();
    var { style, figures, clear, lines } = require_util();
    var isNumber = /[0-9]/;
    var isDef = (any) => any !== void 0;
    var round = (number, precision) => {
      let factor = Math.pow(10, precision);
      return Math.round(number * factor) / factor;
    };
    var NumberPrompt = class extends Prompt {
      constructor(opts = {}) {
        super(opts);
        this.transform = style.render(opts.style);
        this.msg = opts.message;
        this.initial = isDef(opts.initial) ? opts.initial : "";
        this.float = !!opts.float;
        this.round = opts.round || 2;
        this.inc = opts.increment || 1;
        this.min = isDef(opts.min) ? opts.min : -Infinity;
        this.max = isDef(opts.max) ? opts.max : Infinity;
        this.errorMsg = opts.error || `Please Enter A Valid Value`;
        this.validator = opts.validate || (() => true);
        this.color = `cyan`;
        this.value = ``;
        this.typed = ``;
        this.lastHit = 0;
        this.render();
      }
      set value(v) {
        if (!v && v !== 0) {
          this.placeholder = true;
          this.rendered = color.gray(this.transform.render(`${this.initial}`));
          this._value = ``;
        } else {
          this.placeholder = false;
          this.rendered = this.transform.render(`${round(v, this.round)}`);
          this._value = round(v, this.round);
        }
        this.fire();
      }
      get value() {
        return this._value;
      }
      parse(x) {
        return this.float ? parseFloat(x) : parseInt(x);
      }
      valid(c) {
        return c === `-` || c === `.` && this.float || isNumber.test(c);
      }
      reset() {
        this.typed = ``;
        this.value = ``;
        this.fire();
        this.render();
      }
      exit() {
        this.abort();
      }
      abort() {
        let x = this.value;
        this.value = x !== `` ? x : this.initial;
        this.done = this.aborted = true;
        this.error = false;
        this.fire();
        this.render();
        this.out.write(`
`);
        this.close();
      }
      async validate() {
        let valid = await this.validator(this.value);
        if (typeof valid === `string`) {
          this.errorMsg = valid;
          valid = false;
        }
        this.error = !valid;
      }
      async submit() {
        await this.validate();
        if (this.error) {
          this.color = `red`;
          this.fire();
          this.render();
          return;
        }
        let x = this.value;
        this.value = x !== `` ? x : this.initial;
        this.done = true;
        this.aborted = false;
        this.error = false;
        this.fire();
        this.render();
        this.out.write(`
`);
        this.close();
      }
      up() {
        this.typed = ``;
        if (this.value === "") {
          this.value = this.min - this.inc;
        }
        if (this.value >= this.max)
          return this.bell();
        this.value += this.inc;
        this.color = `cyan`;
        this.fire();
        this.render();
      }
      down() {
        this.typed = ``;
        if (this.value === "") {
          this.value = this.min + this.inc;
        }
        if (this.value <= this.min)
          return this.bell();
        this.value -= this.inc;
        this.color = `cyan`;
        this.fire();
        this.render();
      }
      delete() {
        let val = this.value.toString();
        if (val.length === 0)
          return this.bell();
        this.value = this.parse(val = val.slice(0, -1)) || ``;
        if (this.value !== "" && this.value < this.min) {
          this.value = this.min;
        }
        this.color = `cyan`;
        this.fire();
        this.render();
      }
      next() {
        this.value = this.initial;
        this.fire();
        this.render();
      }
      _(c, key) {
        if (!this.valid(c))
          return this.bell();
        const now = Date.now();
        if (now - this.lastHit > 1e3)
          this.typed = ``;
        this.typed += c;
        this.lastHit = now;
        this.color = `cyan`;
        if (c === `.`)
          return this.fire();
        this.value = Math.min(this.parse(this.typed), this.max);
        if (this.value > this.max)
          this.value = this.max;
        if (this.value < this.min)
          this.value = this.min;
        this.fire();
        this.render();
      }
      render() {
        if (this.closed)
          return;
        if (!this.firstRender) {
          if (this.outputError)
            this.out.write(cursor.down(lines(this.outputError, this.out.columns) - 1) + clear(this.outputError, this.out.columns));
          this.out.write(clear(this.outputText, this.out.columns));
        }
        super.render();
        this.outputError = "";
        this.outputText = [
          style.symbol(this.done, this.aborted),
          color.bold(this.msg),
          style.delimiter(this.done),
          !this.done || !this.done && !this.placeholder ? color[this.color]().underline(this.rendered) : this.rendered
        ].join(` `);
        if (this.error) {
          this.outputError += this.errorMsg.split(`
`).reduce((a, l, i) => a + `
${i ? ` ` : figures.pointerSmall} ${color.red().italic(l)}`, ``);
        }
        this.out.write(erase.line + cursor.to(0) + this.outputText + cursor.save + this.outputError + cursor.restore);
      }
    };
    module2.exports = NumberPrompt;
  }
});

// node_modules/.pnpm/prompts@2.4.2/node_modules/prompts/lib/elements/multiselect.js
var require_multiselect = __commonJS({
  "node_modules/.pnpm/prompts@2.4.2/node_modules/prompts/lib/elements/multiselect.js"(exports, module2) {
    "use strict";
    var color = require_kleur();
    var { cursor } = require_src();
    var Prompt = require_prompt();
    var { clear, figures, style, wrap, entriesToDisplay } = require_util();
    var MultiselectPrompt = class extends Prompt {
      constructor(opts = {}) {
        super(opts);
        this.msg = opts.message;
        this.cursor = opts.cursor || 0;
        this.scrollIndex = opts.cursor || 0;
        this.hint = opts.hint || "";
        this.warn = opts.warn || "- This option is disabled -";
        this.minSelected = opts.min;
        this.showMinError = false;
        this.maxChoices = opts.max;
        this.instructions = opts.instructions;
        this.optionsPerPage = opts.optionsPerPage || 10;
        this.value = opts.choices.map((ch, idx) => {
          if (typeof ch === "string")
            ch = { title: ch, value: idx };
          return {
            title: ch && (ch.title || ch.value || ch),
            description: ch && ch.description,
            value: ch && (ch.value === void 0 ? idx : ch.value),
            selected: ch && ch.selected,
            disabled: ch && ch.disabled
          };
        });
        this.clear = clear("", this.out.columns);
        if (!opts.overrideRender) {
          this.render();
        }
      }
      reset() {
        this.value.map((v) => !v.selected);
        this.cursor = 0;
        this.fire();
        this.render();
      }
      selected() {
        return this.value.filter((v) => v.selected);
      }
      exit() {
        this.abort();
      }
      abort() {
        this.done = this.aborted = true;
        this.fire();
        this.render();
        this.out.write("\n");
        this.close();
      }
      submit() {
        const selected = this.value.filter((e) => e.selected);
        if (this.minSelected && selected.length < this.minSelected) {
          this.showMinError = true;
          this.render();
        } else {
          this.done = true;
          this.aborted = false;
          this.fire();
          this.render();
          this.out.write("\n");
          this.close();
        }
      }
      first() {
        this.cursor = 0;
        this.render();
      }
      last() {
        this.cursor = this.value.length - 1;
        this.render();
      }
      next() {
        this.cursor = (this.cursor + 1) % this.value.length;
        this.render();
      }
      up() {
        if (this.cursor === 0) {
          this.cursor = this.value.length - 1;
        } else {
          this.cursor--;
        }
        this.render();
      }
      down() {
        if (this.cursor === this.value.length - 1) {
          this.cursor = 0;
        } else {
          this.cursor++;
        }
        this.render();
      }
      left() {
        this.value[this.cursor].selected = false;
        this.render();
      }
      right() {
        if (this.value.filter((e) => e.selected).length >= this.maxChoices)
          return this.bell();
        this.value[this.cursor].selected = true;
        this.render();
      }
      handleSpaceToggle() {
        const v = this.value[this.cursor];
        if (v.selected) {
          v.selected = false;
          this.render();
        } else if (v.disabled || this.value.filter((e) => e.selected).length >= this.maxChoices) {
          return this.bell();
        } else {
          v.selected = true;
          this.render();
        }
      }
      toggleAll() {
        if (this.maxChoices !== void 0 || this.value[this.cursor].disabled) {
          return this.bell();
        }
        const newSelected = !this.value[this.cursor].selected;
        this.value.filter((v) => !v.disabled).forEach((v) => v.selected = newSelected);
        this.render();
      }
      _(c, key) {
        if (c === " ") {
          this.handleSpaceToggle();
        } else if (c === "a") {
          this.toggleAll();
        } else {
          return this.bell();
        }
      }
      renderInstructions() {
        if (this.instructions === void 0 || this.instructions) {
          if (typeof this.instructions === "string") {
            return this.instructions;
          }
          return `
Instructions:
    ${figures.arrowUp}/${figures.arrowDown}: Highlight option
    ${figures.arrowLeft}/${figures.arrowRight}/[space]: Toggle selection
` + (this.maxChoices === void 0 ? `    a: Toggle all
` : "") + `    enter/return: Complete answer`;
        }
        return "";
      }
      renderOption(cursor2, v, i, arrowIndicator) {
        const prefix = (v.selected ? color.green(figures.radioOn) : figures.radioOff) + " " + arrowIndicator + " ";
        let title, desc;
        if (v.disabled) {
          title = cursor2 === i ? color.gray().underline(v.title) : color.strikethrough().gray(v.title);
        } else {
          title = cursor2 === i ? color.cyan().underline(v.title) : v.title;
          if (cursor2 === i && v.description) {
            desc = ` - ${v.description}`;
            if (prefix.length + title.length + desc.length >= this.out.columns || v.description.split(/\r?\n/).length > 1) {
              desc = "\n" + wrap(v.description, { margin: prefix.length, width: this.out.columns });
            }
          }
        }
        return prefix + title + color.gray(desc || "");
      }
      // shared with autocompleteMultiselect
      paginateOptions(options2) {
        if (options2.length === 0) {
          return color.red("No matches for this query.");
        }
        let { startIndex, endIndex } = entriesToDisplay(this.cursor, options2.length, this.optionsPerPage);
        let prefix, styledOptions = [];
        for (let i = startIndex; i < endIndex; i++) {
          if (i === startIndex && startIndex > 0) {
            prefix = figures.arrowUp;
          } else if (i === endIndex - 1 && endIndex < options2.length) {
            prefix = figures.arrowDown;
          } else {
            prefix = " ";
          }
          styledOptions.push(this.renderOption(this.cursor, options2[i], i, prefix));
        }
        return "\n" + styledOptions.join("\n");
      }
      // shared with autocomleteMultiselect
      renderOptions(options2) {
        if (!this.done) {
          return this.paginateOptions(options2);
        }
        return "";
      }
      renderDoneOrInstructions() {
        if (this.done) {
          return this.value.filter((e) => e.selected).map((v) => v.title).join(", ");
        }
        const output = [color.gray(this.hint), this.renderInstructions()];
        if (this.value[this.cursor].disabled) {
          output.push(color.yellow(this.warn));
        }
        return output.join(" ");
      }
      render() {
        if (this.closed)
          return;
        if (this.firstRender)
          this.out.write(cursor.hide);
        super.render();
        let prompt = [
          style.symbol(this.done, this.aborted),
          color.bold(this.msg),
          style.delimiter(false),
          this.renderDoneOrInstructions()
        ].join(" ");
        if (this.showMinError) {
          prompt += color.red(`You must select a minimum of ${this.minSelected} choices.`);
          this.showMinError = false;
        }
        prompt += this.renderOptions(this.value);
        this.out.write(this.clear + prompt);
        this.clear = clear(prompt, this.out.columns);
      }
    };
    module2.exports = MultiselectPrompt;
  }
});

// node_modules/.pnpm/prompts@2.4.2/node_modules/prompts/lib/elements/autocomplete.js
var require_autocomplete = __commonJS({
  "node_modules/.pnpm/prompts@2.4.2/node_modules/prompts/lib/elements/autocomplete.js"(exports, module2) {
    "use strict";
    var color = require_kleur();
    var Prompt = require_prompt();
    var { erase, cursor } = require_src();
    var { style, clear, figures, wrap, entriesToDisplay } = require_util();
    var getVal = (arr, i) => arr[i] && (arr[i].value || arr[i].title || arr[i]);
    var getTitle = (arr, i) => arr[i] && (arr[i].title || arr[i].value || arr[i]);
    var getIndex = (arr, valOrTitle) => {
      const index = arr.findIndex((el) => el.value === valOrTitle || el.title === valOrTitle);
      return index > -1 ? index : void 0;
    };
    var AutocompletePrompt = class extends Prompt {
      constructor(opts = {}) {
        super(opts);
        this.msg = opts.message;
        this.suggest = opts.suggest;
        this.choices = opts.choices;
        this.initial = typeof opts.initial === "number" ? opts.initial : getIndex(opts.choices, opts.initial);
        this.select = this.initial || opts.cursor || 0;
        this.i18n = { noMatches: opts.noMatches || "no matches found" };
        this.fallback = opts.fallback || this.initial;
        this.clearFirst = opts.clearFirst || false;
        this.suggestions = [];
        this.input = "";
        this.limit = opts.limit || 10;
        this.cursor = 0;
        this.transform = style.render(opts.style);
        this.scale = this.transform.scale;
        this.render = this.render.bind(this);
        this.complete = this.complete.bind(this);
        this.clear = clear("", this.out.columns);
        this.complete(this.render);
        this.render();
      }
      set fallback(fb) {
        this._fb = Number.isSafeInteger(parseInt(fb)) ? parseInt(fb) : fb;
      }
      get fallback() {
        let choice;
        if (typeof this._fb === "number")
          choice = this.choices[this._fb];
        else if (typeof this._fb === "string")
          choice = { title: this._fb };
        return choice || this._fb || { title: this.i18n.noMatches };
      }
      moveSelect(i) {
        this.select = i;
        if (this.suggestions.length > 0)
          this.value = getVal(this.suggestions, i);
        else
          this.value = this.fallback.value;
        this.fire();
      }
      async complete(cb) {
        const p = this.completing = this.suggest(this.input, this.choices);
        const suggestions = await p;
        if (this.completing !== p)
          return;
        this.suggestions = suggestions.map((s, i, arr) => ({ title: getTitle(arr, i), value: getVal(arr, i), description: s.description }));
        this.completing = false;
        const l = Math.max(suggestions.length - 1, 0);
        this.moveSelect(Math.min(l, this.select));
        cb && cb();
      }
      reset() {
        this.input = "";
        this.complete(() => {
          this.moveSelect(this.initial !== void 0 ? this.initial : 0);
          this.render();
        });
        this.render();
      }
      exit() {
        if (this.clearFirst && this.input.length > 0) {
          this.reset();
        } else {
          this.done = this.exited = true;
          this.aborted = false;
          this.fire();
          this.render();
          this.out.write("\n");
          this.close();
        }
      }
      abort() {
        this.done = this.aborted = true;
        this.exited = false;
        this.fire();
        this.render();
        this.out.write("\n");
        this.close();
      }
      submit() {
        this.done = true;
        this.aborted = this.exited = false;
        this.fire();
        this.render();
        this.out.write("\n");
        this.close();
      }
      _(c, key) {
        let s1 = this.input.slice(0, this.cursor);
        let s2 = this.input.slice(this.cursor);
        this.input = `${s1}${c}${s2}`;
        this.cursor = s1.length + 1;
        this.complete(this.render);
        this.render();
      }
      delete() {
        if (this.cursor === 0)
          return this.bell();
        let s1 = this.input.slice(0, this.cursor - 1);
        let s2 = this.input.slice(this.cursor);
        this.input = `${s1}${s2}`;
        this.complete(this.render);
        this.cursor = this.cursor - 1;
        this.render();
      }
      deleteForward() {
        if (this.cursor * this.scale >= this.rendered.length)
          return this.bell();
        let s1 = this.input.slice(0, this.cursor);
        let s2 = this.input.slice(this.cursor + 1);
        this.input = `${s1}${s2}`;
        this.complete(this.render);
        this.render();
      }
      first() {
        this.moveSelect(0);
        this.render();
      }
      last() {
        this.moveSelect(this.suggestions.length - 1);
        this.render();
      }
      up() {
        if (this.select === 0) {
          this.moveSelect(this.suggestions.length - 1);
        } else {
          this.moveSelect(this.select - 1);
        }
        this.render();
      }
      down() {
        if (this.select === this.suggestions.length - 1) {
          this.moveSelect(0);
        } else {
          this.moveSelect(this.select + 1);
        }
        this.render();
      }
      next() {
        if (this.select === this.suggestions.length - 1) {
          this.moveSelect(0);
        } else
          this.moveSelect(this.select + 1);
        this.render();
      }
      nextPage() {
        this.moveSelect(Math.min(this.select + this.limit, this.suggestions.length - 1));
        this.render();
      }
      prevPage() {
        this.moveSelect(Math.max(this.select - this.limit, 0));
        this.render();
      }
      left() {
        if (this.cursor <= 0)
          return this.bell();
        this.cursor = this.cursor - 1;
        this.render();
      }
      right() {
        if (this.cursor * this.scale >= this.rendered.length)
          return this.bell();
        this.cursor = this.cursor + 1;
        this.render();
      }
      renderOption(v, hovered, isStart, isEnd) {
        let desc;
        let prefix = isStart ? figures.arrowUp : isEnd ? figures.arrowDown : " ";
        let title = hovered ? color.cyan().underline(v.title) : v.title;
        prefix = (hovered ? color.cyan(figures.pointer) + " " : "  ") + prefix;
        if (v.description) {
          desc = ` - ${v.description}`;
          if (prefix.length + title.length + desc.length >= this.out.columns || v.description.split(/\r?\n/).length > 1) {
            desc = "\n" + wrap(v.description, { margin: 3, width: this.out.columns });
          }
        }
        return prefix + " " + title + color.gray(desc || "");
      }
      render() {
        if (this.closed)
          return;
        if (this.firstRender)
          this.out.write(cursor.hide);
        else
          this.out.write(clear(this.outputText, this.out.columns));
        super.render();
        let { startIndex, endIndex } = entriesToDisplay(this.select, this.choices.length, this.limit);
        this.outputText = [
          style.symbol(this.done, this.aborted, this.exited),
          color.bold(this.msg),
          style.delimiter(this.completing),
          this.done && this.suggestions[this.select] ? this.suggestions[this.select].title : this.rendered = this.transform.render(this.input)
        ].join(" ");
        if (!this.done) {
          const suggestions = this.suggestions.slice(startIndex, endIndex).map((item, i) => this.renderOption(
            item,
            this.select === i + startIndex,
            i === 0 && startIndex > 0,
            i + startIndex === endIndex - 1 && endIndex < this.choices.length
          )).join("\n");
          this.outputText += `
` + (suggestions || color.gray(this.fallback.title));
        }
        this.out.write(erase.line + cursor.to(0) + this.outputText);
      }
    };
    module2.exports = AutocompletePrompt;
  }
});

// node_modules/.pnpm/prompts@2.4.2/node_modules/prompts/lib/elements/autocompleteMultiselect.js
var require_autocompleteMultiselect = __commonJS({
  "node_modules/.pnpm/prompts@2.4.2/node_modules/prompts/lib/elements/autocompleteMultiselect.js"(exports, module2) {
    "use strict";
    var color = require_kleur();
    var { cursor } = require_src();
    var MultiselectPrompt = require_multiselect();
    var { clear, style, figures } = require_util();
    var AutocompleteMultiselectPrompt = class extends MultiselectPrompt {
      constructor(opts = {}) {
        opts.overrideRender = true;
        super(opts);
        this.inputValue = "";
        this.clear = clear("", this.out.columns);
        this.filteredOptions = this.value;
        this.render();
      }
      last() {
        this.cursor = this.filteredOptions.length - 1;
        this.render();
      }
      next() {
        this.cursor = (this.cursor + 1) % this.filteredOptions.length;
        this.render();
      }
      up() {
        if (this.cursor === 0) {
          this.cursor = this.filteredOptions.length - 1;
        } else {
          this.cursor--;
        }
        this.render();
      }
      down() {
        if (this.cursor === this.filteredOptions.length - 1) {
          this.cursor = 0;
        } else {
          this.cursor++;
        }
        this.render();
      }
      left() {
        this.filteredOptions[this.cursor].selected = false;
        this.render();
      }
      right() {
        if (this.value.filter((e) => e.selected).length >= this.maxChoices)
          return this.bell();
        this.filteredOptions[this.cursor].selected = true;
        this.render();
      }
      delete() {
        if (this.inputValue.length) {
          this.inputValue = this.inputValue.substr(0, this.inputValue.length - 1);
          this.updateFilteredOptions();
        }
      }
      updateFilteredOptions() {
        const currentHighlight = this.filteredOptions[this.cursor];
        this.filteredOptions = this.value.filter((v) => {
          if (this.inputValue) {
            if (typeof v.title === "string") {
              if (v.title.toLowerCase().includes(this.inputValue.toLowerCase())) {
                return true;
              }
            }
            if (typeof v.value === "string") {
              if (v.value.toLowerCase().includes(this.inputValue.toLowerCase())) {
                return true;
              }
            }
            return false;
          }
          return true;
        });
        const newHighlightIndex = this.filteredOptions.findIndex((v) => v === currentHighlight);
        this.cursor = newHighlightIndex < 0 ? 0 : newHighlightIndex;
        this.render();
      }
      handleSpaceToggle() {
        const v = this.filteredOptions[this.cursor];
        if (v.selected) {
          v.selected = false;
          this.render();
        } else if (v.disabled || this.value.filter((e) => e.selected).length >= this.maxChoices) {
          return this.bell();
        } else {
          v.selected = true;
          this.render();
        }
      }
      handleInputChange(c) {
        this.inputValue = this.inputValue + c;
        this.updateFilteredOptions();
      }
      _(c, key) {
        if (c === " ") {
          this.handleSpaceToggle();
        } else {
          this.handleInputChange(c);
        }
      }
      renderInstructions() {
        if (this.instructions === void 0 || this.instructions) {
          if (typeof this.instructions === "string") {
            return this.instructions;
          }
          return `
Instructions:
    ${figures.arrowUp}/${figures.arrowDown}: Highlight option
    ${figures.arrowLeft}/${figures.arrowRight}/[space]: Toggle selection
    [a,b,c]/delete: Filter choices
    enter/return: Complete answer
`;
        }
        return "";
      }
      renderCurrentInput() {
        return `
Filtered results for: ${this.inputValue ? this.inputValue : color.gray("Enter something to filter")}
`;
      }
      renderOption(cursor2, v, i) {
        let title;
        if (v.disabled)
          title = cursor2 === i ? color.gray().underline(v.title) : color.strikethrough().gray(v.title);
        else
          title = cursor2 === i ? color.cyan().underline(v.title) : v.title;
        return (v.selected ? color.green(figures.radioOn) : figures.radioOff) + "  " + title;
      }
      renderDoneOrInstructions() {
        if (this.done) {
          return this.value.filter((e) => e.selected).map((v) => v.title).join(", ");
        }
        const output = [color.gray(this.hint), this.renderInstructions(), this.renderCurrentInput()];
        if (this.filteredOptions.length && this.filteredOptions[this.cursor].disabled) {
          output.push(color.yellow(this.warn));
        }
        return output.join(" ");
      }
      render() {
        if (this.closed)
          return;
        if (this.firstRender)
          this.out.write(cursor.hide);
        super.render();
        let prompt = [
          style.symbol(this.done, this.aborted),
          color.bold(this.msg),
          style.delimiter(false),
          this.renderDoneOrInstructions()
        ].join(" ");
        if (this.showMinError) {
          prompt += color.red(`You must select a minimum of ${this.minSelected} choices.`);
          this.showMinError = false;
        }
        prompt += this.renderOptions(this.filteredOptions);
        this.out.write(this.clear + prompt);
        this.clear = clear(prompt, this.out.columns);
      }
    };
    module2.exports = AutocompleteMultiselectPrompt;
  }
});

// node_modules/.pnpm/prompts@2.4.2/node_modules/prompts/lib/elements/confirm.js
var require_confirm = __commonJS({
  "node_modules/.pnpm/prompts@2.4.2/node_modules/prompts/lib/elements/confirm.js"(exports, module2) {
    var color = require_kleur();
    var Prompt = require_prompt();
    var { style, clear } = require_util();
    var { erase, cursor } = require_src();
    var ConfirmPrompt = class extends Prompt {
      constructor(opts = {}) {
        super(opts);
        this.msg = opts.message;
        this.value = opts.initial;
        this.initialValue = !!opts.initial;
        this.yesMsg = opts.yes || "yes";
        this.yesOption = opts.yesOption || "(Y/n)";
        this.noMsg = opts.no || "no";
        this.noOption = opts.noOption || "(y/N)";
        this.render();
      }
      reset() {
        this.value = this.initialValue;
        this.fire();
        this.render();
      }
      exit() {
        this.abort();
      }
      abort() {
        this.done = this.aborted = true;
        this.fire();
        this.render();
        this.out.write("\n");
        this.close();
      }
      submit() {
        this.value = this.value || false;
        this.done = true;
        this.aborted = false;
        this.fire();
        this.render();
        this.out.write("\n");
        this.close();
      }
      _(c, key) {
        if (c.toLowerCase() === "y") {
          this.value = true;
          return this.submit();
        }
        if (c.toLowerCase() === "n") {
          this.value = false;
          return this.submit();
        }
        return this.bell();
      }
      render() {
        if (this.closed)
          return;
        if (this.firstRender)
          this.out.write(cursor.hide);
        else
          this.out.write(clear(this.outputText, this.out.columns));
        super.render();
        this.outputText = [
          style.symbol(this.done, this.aborted),
          color.bold(this.msg),
          style.delimiter(this.done),
          this.done ? this.value ? this.yesMsg : this.noMsg : color.gray(this.initialValue ? this.yesOption : this.noOption)
        ].join(" ");
        this.out.write(erase.line + cursor.to(0) + this.outputText);
      }
    };
    module2.exports = ConfirmPrompt;
  }
});

// node_modules/.pnpm/prompts@2.4.2/node_modules/prompts/lib/elements/index.js
var require_elements = __commonJS({
  "node_modules/.pnpm/prompts@2.4.2/node_modules/prompts/lib/elements/index.js"(exports, module2) {
    "use strict";
    module2.exports = {
      TextPrompt: require_text(),
      SelectPrompt: require_select(),
      TogglePrompt: require_toggle(),
      DatePrompt: require_date(),
      NumberPrompt: require_number(),
      MultiselectPrompt: require_multiselect(),
      AutocompletePrompt: require_autocomplete(),
      AutocompleteMultiselectPrompt: require_autocompleteMultiselect(),
      ConfirmPrompt: require_confirm()
    };
  }
});

// node_modules/.pnpm/prompts@2.4.2/node_modules/prompts/lib/prompts.js
var require_prompts = __commonJS({
  "node_modules/.pnpm/prompts@2.4.2/node_modules/prompts/lib/prompts.js"(exports) {
    "use strict";
    var $ = exports;
    var el = require_elements();
    var noop = (v) => v;
    function toPrompt(type, args, opts = {}) {
      return new Promise((res, rej) => {
        const p = new el[type](args);
        const onAbort = opts.onAbort || noop;
        const onSubmit = opts.onSubmit || noop;
        const onExit = opts.onExit || noop;
        p.on("state", args.onState || noop);
        p.on("submit", (x) => res(onSubmit(x)));
        p.on("exit", (x) => res(onExit(x)));
        p.on("abort", (x) => rej(onAbort(x)));
      });
    }
    $.text = (args) => toPrompt("TextPrompt", args);
    $.password = (args) => {
      args.style = "password";
      return $.text(args);
    };
    $.invisible = (args) => {
      args.style = "invisible";
      return $.text(args);
    };
    $.number = (args) => toPrompt("NumberPrompt", args);
    $.date = (args) => toPrompt("DatePrompt", args);
    $.confirm = (args) => toPrompt("ConfirmPrompt", args);
    $.list = (args) => {
      const sep = args.separator || ",";
      return toPrompt("TextPrompt", args, {
        onSubmit: (str) => str.split(sep).map((s) => s.trim())
      });
    };
    $.toggle = (args) => toPrompt("TogglePrompt", args);
    $.select = (args) => toPrompt("SelectPrompt", args);
    $.multiselect = (args) => {
      args.choices = [].concat(args.choices || []);
      const toSelected = (items) => items.filter((item) => item.selected).map((item) => item.value);
      return toPrompt("MultiselectPrompt", args, {
        onAbort: toSelected,
        onSubmit: toSelected
      });
    };
    $.autocompleteMultiselect = (args) => {
      args.choices = [].concat(args.choices || []);
      const toSelected = (items) => items.filter((item) => item.selected).map((item) => item.value);
      return toPrompt("AutocompleteMultiselectPrompt", args, {
        onAbort: toSelected,
        onSubmit: toSelected
      });
    };
    var byTitle = (input, choices) => Promise.resolve(
      choices.filter((item) => item.title.slice(0, input.length).toLowerCase() === input.toLowerCase())
    );
    $.autocomplete = (args) => {
      args.suggest = args.suggest || byTitle;
      args.choices = [].concat(args.choices || []);
      return toPrompt("AutocompletePrompt", args);
    };
  }
});

// node_modules/.pnpm/prompts@2.4.2/node_modules/prompts/lib/index.js
var require_lib = __commonJS({
  "node_modules/.pnpm/prompts@2.4.2/node_modules/prompts/lib/index.js"(exports, module2) {
    "use strict";
    var prompts2 = require_prompts();
    var passOn = ["suggest", "format", "onState", "validate", "onRender", "type"];
    var noop = () => {
    };
    async function prompt(questions = [], { onSubmit = noop, onCancel = noop } = {}) {
      const answers = {};
      const override2 = prompt._override || {};
      questions = [].concat(questions);
      let answer, question, quit, name, type, lastPrompt;
      const getFormattedAnswer = async (question2, answer2, skipValidation = false) => {
        if (!skipValidation && question2.validate && question2.validate(answer2) !== true) {
          return;
        }
        return question2.format ? await question2.format(answer2, answers) : answer2;
      };
      for (question of questions) {
        ({ name, type } = question);
        if (typeof type === "function") {
          type = await type(answer, { ...answers }, question);
          question["type"] = type;
        }
        if (!type)
          continue;
        for (let key in question) {
          if (passOn.includes(key))
            continue;
          let value = question[key];
          question[key] = typeof value === "function" ? await value(answer, { ...answers }, lastPrompt) : value;
        }
        lastPrompt = question;
        if (typeof question.message !== "string") {
          throw new Error("prompt message is required");
        }
        ({ name, type } = question);
        if (prompts2[type] === void 0) {
          throw new Error(`prompt type (${type}) is not defined`);
        }
        if (override2[question.name] !== void 0) {
          answer = await getFormattedAnswer(question, override2[question.name]);
          if (answer !== void 0) {
            answers[name] = answer;
            continue;
          }
        }
        try {
          answer = prompt._injected ? getInjectedAnswer(prompt._injected, question.initial) : await prompts2[type](question);
          answers[name] = answer = await getFormattedAnswer(question, answer, true);
          quit = await onSubmit(question, answer, answers);
        } catch (err) {
          quit = !await onCancel(question, answers);
        }
        if (quit)
          return answers;
      }
      return answers;
    }
    function getInjectedAnswer(injected, deafultValue) {
      const answer = injected.shift();
      if (answer instanceof Error) {
        throw answer;
      }
      return answer === void 0 ? deafultValue : answer;
    }
    function inject(answers) {
      prompt._injected = (prompt._injected || []).concat(answers);
    }
    function override(answers) {
      prompt._override = Object.assign({}, answers);
    }
    module2.exports = Object.assign(prompt, { prompt, prompts: prompts2, inject, override });
  }
});

// node_modules/.pnpm/ejs@3.1.10/node_modules/ejs/lib/utils.js
var require_utils = __commonJS({
  "node_modules/.pnpm/ejs@3.1.10/node_modules/ejs/lib/utils.js"(exports) {
    "use strict";
    var regExpChars = /[|\\{}()[\]^$+*?.]/g;
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    var hasOwn = function(obj, key) {
      return hasOwnProperty.apply(obj, [key]);
    };
    exports.escapeRegExpChars = function(string) {
      if (!string) {
        return "";
      }
      return String(string).replace(regExpChars, "\\$&");
    };
    var _ENCODE_HTML_RULES = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&#34;",
      "'": "&#39;"
    };
    var _MATCH_HTML = /[&<>'"]/g;
    function encode_char(c) {
      return _ENCODE_HTML_RULES[c] || c;
    }
    var escapeFuncStr = `var _ENCODE_HTML_RULES = {
      "&": "&amp;"
    , "<": "&lt;"
    , ">": "&gt;"
    , '"': "&#34;"
    , "'": "&#39;"
    }
  , _MATCH_HTML = /[&<>'"]/g;
function encode_char(c) {
  return _ENCODE_HTML_RULES[c] || c;
};
`;
    exports.escapeXML = function(markup) {
      return markup == void 0 ? "" : String(markup).replace(_MATCH_HTML, encode_char);
    };
    function escapeXMLToString() {
      return Function.prototype.toString.call(this) + ";\n" + escapeFuncStr;
    }
    try {
      if (typeof Object.defineProperty === "function") {
        Object.defineProperty(exports.escapeXML, "toString", { value: escapeXMLToString });
      } else {
        exports.escapeXML.toString = escapeXMLToString;
      }
    } catch (err) {
      console.warn("Unable to set escapeXML.toString (is the Function prototype frozen?)");
    }
    exports.shallowCopy = function(to, from) {
      from = from || {};
      if (to !== null && to !== void 0) {
        for (var p in from) {
          if (!hasOwn(from, p)) {
            continue;
          }
          if (p === "__proto__" || p === "constructor") {
            continue;
          }
          to[p] = from[p];
        }
      }
      return to;
    };
    exports.shallowCopyFromList = function(to, from, list) {
      list = list || [];
      from = from || {};
      if (to !== null && to !== void 0) {
        for (var i = 0; i < list.length; i++) {
          var p = list[i];
          if (typeof from[p] != "undefined") {
            if (!hasOwn(from, p)) {
              continue;
            }
            if (p === "__proto__" || p === "constructor") {
              continue;
            }
            to[p] = from[p];
          }
        }
      }
      return to;
    };
    exports.cache = {
      _data: {},
      set: function(key, val) {
        this._data[key] = val;
      },
      get: function(key) {
        return this._data[key];
      },
      remove: function(key) {
        delete this._data[key];
      },
      reset: function() {
        this._data = {};
      }
    };
    exports.hyphenToCamel = function(str) {
      return str.replace(/-[a-z]/g, function(match) {
        return match[1].toUpperCase();
      });
    };
    exports.createNullProtoObjWherePossible = function() {
      if (typeof Object.create == "function") {
        return function() {
          return /* @__PURE__ */ Object.create(null);
        };
      }
      if (!({ __proto__: null } instanceof Object)) {
        return function() {
          return { __proto__: null };
        };
      }
      return function() {
        return {};
      };
    }();
    exports.hasOwnOnlyObject = function(obj) {
      var o = exports.createNullProtoObjWherePossible();
      for (var p in obj) {
        if (hasOwn(obj, p)) {
          o[p] = obj[p];
        }
      }
      return o;
    };
  }
});

// node_modules/.pnpm/ejs@3.1.10/node_modules/ejs/package.json
var require_package = __commonJS({
  "node_modules/.pnpm/ejs@3.1.10/node_modules/ejs/package.json"(exports, module2) {
    module2.exports = {
      name: "ejs",
      description: "Embedded JavaScript templates",
      keywords: [
        "template",
        "engine",
        "ejs"
      ],
      version: "3.1.10",
      author: "Matthew Eernisse <mde@fleegix.org> (http://fleegix.org)",
      license: "Apache-2.0",
      bin: {
        ejs: "./bin/cli.js"
      },
      main: "./lib/ejs.js",
      jsdelivr: "ejs.min.js",
      unpkg: "ejs.min.js",
      repository: {
        type: "git",
        url: "git://github.com/mde/ejs.git"
      },
      bugs: "https://github.com/mde/ejs/issues",
      homepage: "https://github.com/mde/ejs",
      dependencies: {
        jake: "^10.8.5"
      },
      devDependencies: {
        browserify: "^16.5.1",
        eslint: "^6.8.0",
        "git-directory-deploy": "^1.5.1",
        jsdoc: "^4.0.2",
        "lru-cache": "^4.0.1",
        mocha: "^10.2.0",
        "uglify-js": "^3.3.16"
      },
      engines: {
        node: ">=0.10.0"
      },
      scripts: {
        test: "npx jake test"
      }
    };
  }
});

// node_modules/.pnpm/ejs@3.1.10/node_modules/ejs/lib/ejs.js
var require_ejs = __commonJS({
  "node_modules/.pnpm/ejs@3.1.10/node_modules/ejs/lib/ejs.js"(exports) {
    "use strict";
    var fs6 = require("fs");
    var path6 = require("path");
    var utils = require_utils();
    var scopeOptionWarned = false;
    var _VERSION_STRING = require_package().version;
    var _DEFAULT_OPEN_DELIMITER = "<";
    var _DEFAULT_CLOSE_DELIMITER = ">";
    var _DEFAULT_DELIMITER = "%";
    var _DEFAULT_LOCALS_NAME = "locals";
    var _NAME = "ejs";
    var _REGEX_STRING = "(<%%|%%>|<%=|<%-|<%_|<%#|<%|%>|-%>|_%>)";
    var _OPTS_PASSABLE_WITH_DATA = [
      "delimiter",
      "scope",
      "context",
      "debug",
      "compileDebug",
      "client",
      "_with",
      "rmWhitespace",
      "strict",
      "filename",
      "async"
    ];
    var _OPTS_PASSABLE_WITH_DATA_EXPRESS = _OPTS_PASSABLE_WITH_DATA.concat("cache");
    var _BOM = /^\uFEFF/;
    var _JS_IDENTIFIER = /^[a-zA-Z_$][0-9a-zA-Z_$]*$/;
    exports.cache = utils.cache;
    exports.fileLoader = fs6.readFileSync;
    exports.localsName = _DEFAULT_LOCALS_NAME;
    exports.promiseImpl = new Function("return this;")().Promise;
    exports.resolveInclude = function(name, filename, isDir) {
      var dirname2 = path6.dirname;
      var extname = path6.extname;
      var resolve6 = path6.resolve;
      var includePath = resolve6(isDir ? filename : dirname2(filename), name);
      var ext = extname(name);
      if (!ext) {
        includePath += ".ejs";
      }
      return includePath;
    };
    function resolvePaths(name, paths) {
      var filePath;
      if (paths.some(function(v) {
        filePath = exports.resolveInclude(name, v, true);
        return fs6.existsSync(filePath);
      })) {
        return filePath;
      }
    }
    function getIncludePath(path7, options2) {
      var includePath;
      var filePath;
      var views = options2.views;
      var match = /^[A-Za-z]+:\\|^\//.exec(path7);
      if (match && match.length) {
        path7 = path7.replace(/^\/*/, "");
        if (Array.isArray(options2.root)) {
          includePath = resolvePaths(path7, options2.root);
        } else {
          includePath = exports.resolveInclude(path7, options2.root || "/", true);
        }
      } else {
        if (options2.filename) {
          filePath = exports.resolveInclude(path7, options2.filename);
          if (fs6.existsSync(filePath)) {
            includePath = filePath;
          }
        }
        if (!includePath && Array.isArray(views)) {
          includePath = resolvePaths(path7, views);
        }
        if (!includePath && typeof options2.includer !== "function") {
          throw new Error('Could not find the include file "' + options2.escapeFunction(path7) + '"');
        }
      }
      return includePath;
    }
    function handleCache(options2, template) {
      var func;
      var filename = options2.filename;
      var hasTemplate = arguments.length > 1;
      if (options2.cache) {
        if (!filename) {
          throw new Error("cache option requires a filename");
        }
        func = exports.cache.get(filename);
        if (func) {
          return func;
        }
        if (!hasTemplate) {
          template = fileLoader(filename).toString().replace(_BOM, "");
        }
      } else if (!hasTemplate) {
        if (!filename) {
          throw new Error("Internal EJS error: no file name or template provided");
        }
        template = fileLoader(filename).toString().replace(_BOM, "");
      }
      func = exports.compile(template, options2);
      if (options2.cache) {
        exports.cache.set(filename, func);
      }
      return func;
    }
    function tryHandleCache(options2, data, cb) {
      var result;
      if (!cb) {
        if (typeof exports.promiseImpl == "function") {
          return new exports.promiseImpl(function(resolve6, reject) {
            try {
              result = handleCache(options2)(data);
              resolve6(result);
            } catch (err) {
              reject(err);
            }
          });
        } else {
          throw new Error("Please provide a callback function");
        }
      } else {
        try {
          result = handleCache(options2)(data);
        } catch (err) {
          return cb(err);
        }
        cb(null, result);
      }
    }
    function fileLoader(filePath) {
      return exports.fileLoader(filePath);
    }
    function includeFile(path7, options2) {
      var opts = utils.shallowCopy(utils.createNullProtoObjWherePossible(), options2);
      opts.filename = getIncludePath(path7, opts);
      if (typeof options2.includer === "function") {
        var includerResult = options2.includer(path7, opts.filename);
        if (includerResult) {
          if (includerResult.filename) {
            opts.filename = includerResult.filename;
          }
          if (includerResult.template) {
            return handleCache(opts, includerResult.template);
          }
        }
      }
      return handleCache(opts);
    }
    function rethrow(err, str, flnm, lineno, esc) {
      var lines = str.split("\n");
      var start = Math.max(lineno - 3, 0);
      var end = Math.min(lines.length, lineno + 3);
      var filename = esc(flnm);
      var context = lines.slice(start, end).map(function(line, i) {
        var curr = i + start + 1;
        return (curr == lineno ? " >> " : "    ") + curr + "| " + line;
      }).join("\n");
      err.path = filename;
      err.message = (filename || "ejs") + ":" + lineno + "\n" + context + "\n\n" + err.message;
      throw err;
    }
    function stripSemi(str) {
      return str.replace(/;(\s*$)/, "$1");
    }
    exports.compile = function compile(template, opts) {
      var templ;
      if (opts && opts.scope) {
        if (!scopeOptionWarned) {
          console.warn("`scope` option is deprecated and will be removed in EJS 3");
          scopeOptionWarned = true;
        }
        if (!opts.context) {
          opts.context = opts.scope;
        }
        delete opts.scope;
      }
      templ = new Template(template, opts);
      return templ.compile();
    };
    exports.render = function(template, d, o) {
      var data = d || utils.createNullProtoObjWherePossible();
      var opts = o || utils.createNullProtoObjWherePossible();
      if (arguments.length == 2) {
        utils.shallowCopyFromList(opts, data, _OPTS_PASSABLE_WITH_DATA);
      }
      return handleCache(opts, template)(data);
    };
    exports.renderFile = function() {
      var args = Array.prototype.slice.call(arguments);
      var filename = args.shift();
      var cb;
      var opts = { filename };
      var data;
      var viewOpts;
      if (typeof arguments[arguments.length - 1] == "function") {
        cb = args.pop();
      }
      if (args.length) {
        data = args.shift();
        if (args.length) {
          utils.shallowCopy(opts, args.pop());
        } else {
          if (data.settings) {
            if (data.settings.views) {
              opts.views = data.settings.views;
            }
            if (data.settings["view cache"]) {
              opts.cache = true;
            }
            viewOpts = data.settings["view options"];
            if (viewOpts) {
              utils.shallowCopy(opts, viewOpts);
            }
          }
          utils.shallowCopyFromList(opts, data, _OPTS_PASSABLE_WITH_DATA_EXPRESS);
        }
        opts.filename = filename;
      } else {
        data = utils.createNullProtoObjWherePossible();
      }
      return tryHandleCache(opts, data, cb);
    };
    exports.Template = Template;
    exports.clearCache = function() {
      exports.cache.reset();
    };
    function Template(text, optsParam) {
      var opts = utils.hasOwnOnlyObject(optsParam);
      var options2 = utils.createNullProtoObjWherePossible();
      this.templateText = text;
      this.mode = null;
      this.truncate = false;
      this.currentLine = 1;
      this.source = "";
      options2.client = opts.client || false;
      options2.escapeFunction = opts.escape || opts.escapeFunction || utils.escapeXML;
      options2.compileDebug = opts.compileDebug !== false;
      options2.debug = !!opts.debug;
      options2.filename = opts.filename;
      options2.openDelimiter = opts.openDelimiter || exports.openDelimiter || _DEFAULT_OPEN_DELIMITER;
      options2.closeDelimiter = opts.closeDelimiter || exports.closeDelimiter || _DEFAULT_CLOSE_DELIMITER;
      options2.delimiter = opts.delimiter || exports.delimiter || _DEFAULT_DELIMITER;
      options2.strict = opts.strict || false;
      options2.context = opts.context;
      options2.cache = opts.cache || false;
      options2.rmWhitespace = opts.rmWhitespace;
      options2.root = opts.root;
      options2.includer = opts.includer;
      options2.outputFunctionName = opts.outputFunctionName;
      options2.localsName = opts.localsName || exports.localsName || _DEFAULT_LOCALS_NAME;
      options2.views = opts.views;
      options2.async = opts.async;
      options2.destructuredLocals = opts.destructuredLocals;
      options2.legacyInclude = typeof opts.legacyInclude != "undefined" ? !!opts.legacyInclude : true;
      if (options2.strict) {
        options2._with = false;
      } else {
        options2._with = typeof opts._with != "undefined" ? opts._with : true;
      }
      this.opts = options2;
      this.regex = this.createRegex();
    }
    Template.modes = {
      EVAL: "eval",
      ESCAPED: "escaped",
      RAW: "raw",
      COMMENT: "comment",
      LITERAL: "literal"
    };
    Template.prototype = {
      createRegex: function() {
        var str = _REGEX_STRING;
        var delim = utils.escapeRegExpChars(this.opts.delimiter);
        var open = utils.escapeRegExpChars(this.opts.openDelimiter);
        var close = utils.escapeRegExpChars(this.opts.closeDelimiter);
        str = str.replace(/%/g, delim).replace(/</g, open).replace(/>/g, close);
        return new RegExp(str);
      },
      compile: function() {
        var src;
        var fn;
        var opts = this.opts;
        var prepended = "";
        var appended = "";
        var escapeFn = opts.escapeFunction;
        var ctor;
        var sanitizedFilename = opts.filename ? JSON.stringify(opts.filename) : "undefined";
        if (!this.source) {
          this.generateSource();
          prepended += '  var __output = "";\n  function __append(s) { if (s !== undefined && s !== null) __output += s }\n';
          if (opts.outputFunctionName) {
            if (!_JS_IDENTIFIER.test(opts.outputFunctionName)) {
              throw new Error("outputFunctionName is not a valid JS identifier.");
            }
            prepended += "  var " + opts.outputFunctionName + " = __append;\n";
          }
          if (opts.localsName && !_JS_IDENTIFIER.test(opts.localsName)) {
            throw new Error("localsName is not a valid JS identifier.");
          }
          if (opts.destructuredLocals && opts.destructuredLocals.length) {
            var destructuring = "  var __locals = (" + opts.localsName + " || {}),\n";
            for (var i = 0; i < opts.destructuredLocals.length; i++) {
              var name = opts.destructuredLocals[i];
              if (!_JS_IDENTIFIER.test(name)) {
                throw new Error("destructuredLocals[" + i + "] is not a valid JS identifier.");
              }
              if (i > 0) {
                destructuring += ",\n  ";
              }
              destructuring += name + " = __locals." + name;
            }
            prepended += destructuring + ";\n";
          }
          if (opts._with !== false) {
            prepended += "  with (" + opts.localsName + " || {}) {\n";
            appended += "  }\n";
          }
          appended += "  return __output;\n";
          this.source = prepended + this.source + appended;
        }
        if (opts.compileDebug) {
          src = "var __line = 1\n  , __lines = " + JSON.stringify(this.templateText) + "\n  , __filename = " + sanitizedFilename + ";\ntry {\n" + this.source + "} catch (e) {\n  rethrow(e, __lines, __filename, __line, escapeFn);\n}\n";
        } else {
          src = this.source;
        }
        if (opts.client) {
          src = "escapeFn = escapeFn || " + escapeFn.toString() + ";\n" + src;
          if (opts.compileDebug) {
            src = "rethrow = rethrow || " + rethrow.toString() + ";\n" + src;
          }
        }
        if (opts.strict) {
          src = '"use strict";\n' + src;
        }
        if (opts.debug) {
          console.log(src);
        }
        if (opts.compileDebug && opts.filename) {
          src = src + "\n//# sourceURL=" + sanitizedFilename + "\n";
        }
        try {
          if (opts.async) {
            try {
              ctor = new Function("return (async function(){}).constructor;")();
            } catch (e) {
              if (e instanceof SyntaxError) {
                throw new Error("This environment does not support async/await");
              } else {
                throw e;
              }
            }
          } else {
            ctor = Function;
          }
          fn = new ctor(opts.localsName + ", escapeFn, include, rethrow", src);
        } catch (e) {
          if (e instanceof SyntaxError) {
            if (opts.filename) {
              e.message += " in " + opts.filename;
            }
            e.message += " while compiling ejs\n\n";
            e.message += "If the above error is not helpful, you may want to try EJS-Lint:\n";
            e.message += "https://github.com/RyanZim/EJS-Lint";
            if (!opts.async) {
              e.message += "\n";
              e.message += "Or, if you meant to create an async function, pass `async: true` as an option.";
            }
          }
          throw e;
        }
        var returnedFn = opts.client ? fn : function anonymous(data) {
          var include = function(path7, includeData) {
            var d = utils.shallowCopy(utils.createNullProtoObjWherePossible(), data);
            if (includeData) {
              d = utils.shallowCopy(d, includeData);
            }
            return includeFile(path7, opts)(d);
          };
          return fn.apply(
            opts.context,
            [data || utils.createNullProtoObjWherePossible(), escapeFn, include, rethrow]
          );
        };
        if (opts.filename && typeof Object.defineProperty === "function") {
          var filename = opts.filename;
          var basename3 = path6.basename(filename, path6.extname(filename));
          try {
            Object.defineProperty(returnedFn, "name", {
              value: basename3,
              writable: false,
              enumerable: false,
              configurable: true
            });
          } catch (e) {
          }
        }
        return returnedFn;
      },
      generateSource: function() {
        var opts = this.opts;
        if (opts.rmWhitespace) {
          this.templateText = this.templateText.replace(/[\r\n]+/g, "\n").replace(/^\s+|\s+$/gm, "");
        }
        this.templateText = this.templateText.replace(/[ \t]*<%_/gm, "<%_").replace(/_%>[ \t]*/gm, "_%>");
        var self2 = this;
        var matches = this.parseTemplateText();
        var d = this.opts.delimiter;
        var o = this.opts.openDelimiter;
        var c = this.opts.closeDelimiter;
        if (matches && matches.length) {
          matches.forEach(function(line, index) {
            var closing;
            if (line.indexOf(o + d) === 0 && line.indexOf(o + d + d) !== 0) {
              closing = matches[index + 2];
              if (!(closing == d + c || closing == "-" + d + c || closing == "_" + d + c)) {
                throw new Error('Could not find matching close tag for "' + line + '".');
              }
            }
            self2.scanLine(line);
          });
        }
      },
      parseTemplateText: function() {
        var str = this.templateText;
        var pat = this.regex;
        var result = pat.exec(str);
        var arr = [];
        var firstPos;
        while (result) {
          firstPos = result.index;
          if (firstPos !== 0) {
            arr.push(str.substring(0, firstPos));
            str = str.slice(firstPos);
          }
          arr.push(result[0]);
          str = str.slice(result[0].length);
          result = pat.exec(str);
        }
        if (str) {
          arr.push(str);
        }
        return arr;
      },
      _addOutput: function(line) {
        if (this.truncate) {
          line = line.replace(/^(?:\r\n|\r|\n)/, "");
          this.truncate = false;
        }
        if (!line) {
          return line;
        }
        line = line.replace(/\\/g, "\\\\");
        line = line.replace(/\n/g, "\\n");
        line = line.replace(/\r/g, "\\r");
        line = line.replace(/"/g, '\\"');
        this.source += '    ; __append("' + line + '")\n';
      },
      scanLine: function(line) {
        var self2 = this;
        var d = this.opts.delimiter;
        var o = this.opts.openDelimiter;
        var c = this.opts.closeDelimiter;
        var newLineCount = 0;
        newLineCount = line.split("\n").length - 1;
        switch (line) {
          case o + d:
          case o + d + "_":
            this.mode = Template.modes.EVAL;
            break;
          case o + d + "=":
            this.mode = Template.modes.ESCAPED;
            break;
          case o + d + "-":
            this.mode = Template.modes.RAW;
            break;
          case o + d + "#":
            this.mode = Template.modes.COMMENT;
            break;
          case o + d + d:
            this.mode = Template.modes.LITERAL;
            this.source += '    ; __append("' + line.replace(o + d + d, o + d) + '")\n';
            break;
          case d + d + c:
            this.mode = Template.modes.LITERAL;
            this.source += '    ; __append("' + line.replace(d + d + c, d + c) + '")\n';
            break;
          case d + c:
          case "-" + d + c:
          case "_" + d + c:
            if (this.mode == Template.modes.LITERAL) {
              this._addOutput(line);
            }
            this.mode = null;
            this.truncate = line.indexOf("-") === 0 || line.indexOf("_") === 0;
            break;
          default:
            if (this.mode) {
              switch (this.mode) {
                case Template.modes.EVAL:
                case Template.modes.ESCAPED:
                case Template.modes.RAW:
                  if (line.lastIndexOf("//") > line.lastIndexOf("\n")) {
                    line += "\n";
                  }
              }
              switch (this.mode) {
                case Template.modes.EVAL:
                  this.source += "    ; " + line + "\n";
                  break;
                case Template.modes.ESCAPED:
                  this.source += "    ; __append(escapeFn(" + stripSemi(line) + "))\n";
                  break;
                case Template.modes.RAW:
                  this.source += "    ; __append(" + stripSemi(line) + ")\n";
                  break;
                case Template.modes.COMMENT:
                  break;
                case Template.modes.LITERAL:
                  this._addOutput(line);
                  break;
              }
            } else {
              this._addOutput(line);
            }
        }
        if (self2.opts.compileDebug && newLineCount) {
          this.currentLine += newLineCount;
          this.source += "    ; __line = " + this.currentLine + "\n";
        }
      }
    };
    exports.escapeXML = utils.escapeXML;
    exports.__express = exports.renderFile;
    exports.VERSION = _VERSION_STRING;
    exports.name = _NAME;
    if (typeof window != "undefined") {
      window.ejs = exports;
    }
  }
});

// index.ts
var fs5 = __toESM(require("fs"), 1);
var path5 = __toESM(require("path"), 1);
var import_node_util = require("util");
var import_prompts = __toESM(require_lib(), 1);

// node_modules/.pnpm/kolorist@1.8.0/node_modules/kolorist/dist/esm/index.mjs
var enabled = true;
var globalVar = typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {};
var supportLevel = 0;
if (globalVar.process && globalVar.process.env && globalVar.process.stdout) {
  const { FORCE_COLOR, NODE_DISABLE_COLORS, NO_COLOR, TERM, COLORTERM } = globalVar.process.env;
  if (NODE_DISABLE_COLORS || NO_COLOR || FORCE_COLOR === "0") {
    enabled = false;
  } else if (FORCE_COLOR === "1" || FORCE_COLOR === "2" || FORCE_COLOR === "3") {
    enabled = true;
  } else if (TERM === "dumb") {
    enabled = false;
  } else if ("CI" in globalVar.process.env && [
    "TRAVIS",
    "CIRCLECI",
    "APPVEYOR",
    "GITLAB_CI",
    "GITHUB_ACTIONS",
    "BUILDKITE",
    "DRONE"
  ].some((vendor) => vendor in globalVar.process.env)) {
    enabled = true;
  } else {
    enabled = process.stdout.isTTY;
  }
  if (enabled) {
    if (process.platform === "win32") {
      supportLevel = 3;
    } else {
      if (COLORTERM && (COLORTERM === "truecolor" || COLORTERM === "24bit")) {
        supportLevel = 3;
      } else if (TERM && (TERM.endsWith("-256color") || TERM.endsWith("256"))) {
        supportLevel = 2;
      } else {
        supportLevel = 1;
      }
    }
  }
}
var options = {
  enabled,
  supportLevel
};
function kolorist(start, end, level = 1) {
  const open = `\x1B[${start}m`;
  const close = `\x1B[${end}m`;
  const regex = new RegExp(`\\x1b\\[${end}m`, "g");
  return (str) => {
    return options.enabled && options.supportLevel >= level ? open + ("" + str).replace(regex, open) + close : "" + str;
  };
}
var reset = kolorist(0, 0);
var bold = kolorist(1, 22);
var dim = kolorist(2, 22);
var italic = kolorist(3, 23);
var underline = kolorist(4, 24);
var inverse = kolorist(7, 27);
var hidden = kolorist(8, 28);
var strikethrough = kolorist(9, 29);
var black = kolorist(30, 39);
var red = kolorist(31, 39);
var green = kolorist(32, 39);
var yellow = kolorist(33, 39);
var blue = kolorist(34, 39);
var magenta = kolorist(35, 39);
var cyan = kolorist(36, 39);
var white = kolorist(97, 39);
var gray = kolorist(90, 39);
var lightGray = kolorist(37, 39);
var lightRed = kolorist(91, 39);
var lightGreen = kolorist(92, 39);
var lightYellow = kolorist(93, 39);
var lightBlue = kolorist(94, 39);
var lightMagenta = kolorist(95, 39);
var lightCyan = kolorist(96, 39);
var bgBlack = kolorist(40, 49);
var bgRed = kolorist(41, 49);
var bgGreen = kolorist(42, 49);
var bgYellow = kolorist(43, 49);
var bgBlue = kolorist(44, 49);
var bgMagenta = kolorist(45, 49);
var bgCyan = kolorist(46, 49);
var bgWhite = kolorist(107, 49);
var bgGray = kolorist(100, 49);
var bgLightRed = kolorist(101, 49);
var bgLightGreen = kolorist(102, 49);
var bgLightYellow = kolorist(103, 49);
var bgLightBlue = kolorist(104, 49);
var bgLightMagenta = kolorist(105, 49);
var bgLightCyan = kolorist(106, 49);
var bgLightGray = kolorist(47, 49);

// index.ts
var import_ejs2 = __toESM(require_ejs(), 1);

// utils/banners.ts
var defaultBanner = "Vue.js - The Progressive JavaScript Framework";
var gradientBanner = "\x1B[38;2;66;211;146mV\x1B[39m\x1B[38;2;66;211;146mu\x1B[39m\x1B[38;2;66;211;146me\x1B[39m\x1B[38;2;66;211;146m.\x1B[39m\x1B[38;2;66;211;146mj\x1B[39m\x1B[38;2;67;209;149ms\x1B[39m \x1B[38;2;68;206;152m-\x1B[39m \x1B[38;2;69;204;155mT\x1B[39m\x1B[38;2;70;201;158mh\x1B[39m\x1B[38;2;71;199;162me\x1B[39m \x1B[38;2;72;196;165mP\x1B[39m\x1B[38;2;73;194;168mr\x1B[39m\x1B[38;2;74;192;171mo\x1B[39m\x1B[38;2;75;189;174mg\x1B[39m\x1B[38;2;76;187;177mr\x1B[39m\x1B[38;2;77;184;180me\x1B[39m\x1B[38;2;78;182;183ms\x1B[39m\x1B[38;2;79;179;186ms\x1B[39m\x1B[38;2;80;177;190mi\x1B[39m\x1B[38;2;81;175;193mv\x1B[39m\x1B[38;2;82;172;196me\x1B[39m \x1B[38;2;83;170;199mJ\x1B[39m\x1B[38;2;83;167;202ma\x1B[39m\x1B[38;2;84;165;205mv\x1B[39m\x1B[38;2;85;162;208ma\x1B[39m\x1B[38;2;86;160;211mS\x1B[39m\x1B[38;2;87;158;215mc\x1B[39m\x1B[38;2;88;155;218mr\x1B[39m\x1B[38;2;89;153;221mi\x1B[39m\x1B[38;2;90;150;224mp\x1B[39m\x1B[38;2;91;148;227mt\x1B[39m \x1B[38;2;92;145;230mF\x1B[39m\x1B[38;2;93;143;233mr\x1B[39m\x1B[38;2;94;141;236ma\x1B[39m\x1B[38;2;95;138;239mm\x1B[39m\x1B[38;2;96;136;243me\x1B[39m\x1B[38;2;97;133;246mw\x1B[39m\x1B[38;2;98;131;249mo\x1B[39m\x1B[38;2;99;128;252mr\x1B[39m\x1B[38;2;100;126;255mk\x1B[39m";

// utils/renderTemplate.ts
var fs = __toESM(require("fs"), 1);
var path = __toESM(require("path"), 1);
var import_node_url = require("url");

// utils/deepMerge.ts
var isObject = (val) => val && typeof val === "object";
var mergeArrayWithDedupe = (a, b) => Array.from(/* @__PURE__ */ new Set([...a, ...b]));
function deepMerge(target, obj) {
  for (const key of Object.keys(obj)) {
    const oldVal = target[key];
    const newVal = obj[key];
    if (Array.isArray(oldVal) && Array.isArray(newVal)) {
      target[key] = mergeArrayWithDedupe(oldVal, newVal);
    } else if (isObject(oldVal) && isObject(newVal)) {
      target[key] = deepMerge(oldVal, newVal);
    } else {
      target[key] = newVal;
    }
  }
  return target;
}
var deepMerge_default = deepMerge;

// utils/sortDependencies.ts
function sortDependencies(packageJson) {
  const sorted = {};
  const depTypes = ["dependencies", "devDependencies", "peerDependencies", "optionalDependencies"];
  for (const depType of depTypes) {
    if (packageJson[depType]) {
      sorted[depType] = {};
      Object.keys(packageJson[depType]).sort().forEach((name) => {
        sorted[depType][name] = packageJson[depType][name];
      });
    }
  }
  return {
    ...packageJson,
    ...sorted
  };
}

// utils/renderTemplate.ts
function renderTemplate(src, dest, callbacks) {
  const stats = fs.statSync(src);
  if (stats.isDirectory()) {
    if (path.basename(src) === "node_modules") {
      return;
    }
    fs.mkdirSync(dest, { recursive: true });
    for (const file of fs.readdirSync(src)) {
      renderTemplate(path.resolve(src, file), path.resolve(dest, file), callbacks);
    }
    return;
  }
  const filename = path.basename(src);
  if (filename === "package.json" && fs.existsSync(dest)) {
    const existing = JSON.parse(fs.readFileSync(dest, "utf8"));
    const newPackage = JSON.parse(fs.readFileSync(src, "utf8"));
    const pkg = sortDependencies(deepMerge_default(existing, newPackage));
    fs.writeFileSync(dest, JSON.stringify(pkg, null, 2) + "\n");
    return;
  }
  if (filename === "extensions.json" && fs.existsSync(dest)) {
    const existing = JSON.parse(fs.readFileSync(dest, "utf8"));
    const newExtensions = JSON.parse(fs.readFileSync(src, "utf8"));
    const extensions = deepMerge_default(existing, newExtensions);
    fs.writeFileSync(dest, JSON.stringify(extensions, null, 2) + "\n");
    return;
  }
  if (filename === "settings.json" && fs.existsSync(dest)) {
    const existing = JSON.parse(fs.readFileSync(dest, "utf8"));
    const newSettings = JSON.parse(fs.readFileSync(src, "utf8"));
    const settings = deepMerge_default(existing, newSettings);
    fs.writeFileSync(dest, JSON.stringify(settings, null, 2) + "\n");
    return;
  }
  if (filename.startsWith("_")) {
    dest = path.resolve(path.dirname(dest), filename.replace(/^_/, "."));
  }
  if (filename === "_gitignore" && fs.existsSync(dest)) {
    const existing = fs.readFileSync(dest, "utf8");
    const newGitignore = fs.readFileSync(src, "utf8");
    fs.writeFileSync(dest, existing + "\n" + newGitignore);
    return;
  }
  if (filename.endsWith(".data.mjs")) {
    dest = dest.replace(/\.data\.mjs$/, "");
    callbacks.push(async (dataStore) => {
      const getData = (await import((0, import_node_url.pathToFileURL)(src).toString())).default;
      dataStore[dest] = await getData({
        oldData: dataStore[dest] || {}
      });
    });
    return;
  }
  fs.copyFileSync(src, dest);
}
var renderTemplate_default = renderTemplate;

// utils/directoryTraverse.ts
var fs2 = __toESM(require("fs"), 1);
var path2 = __toESM(require("path"), 1);
function preOrderDirectoryTraverse(dir, dirCallback, fileCallback) {
  for (const filename of fs2.readdirSync(dir)) {
    if (filename === ".git") {
      continue;
    }
    const fullpath = path2.resolve(dir, filename);
    if (fs2.lstatSync(fullpath).isDirectory()) {
      dirCallback(fullpath);
      if (fs2.existsSync(fullpath)) {
        preOrderDirectoryTraverse(fullpath, dirCallback, fileCallback);
      }
      continue;
    }
    fileCallback(fullpath);
  }
}
function postOrderDirectoryTraverse(dir, dirCallback, fileCallback) {
  for (const filename of fs2.readdirSync(dir)) {
    if (filename === ".git") {
      continue;
    }
    const fullpath = path2.resolve(dir, filename);
    if (fs2.lstatSync(fullpath).isDirectory()) {
      postOrderDirectoryTraverse(fullpath, dirCallback, fileCallback);
      dirCallback(fullpath);
      continue;
    }
    fileCallback(fullpath);
  }
}

// utils/getCommand.ts
function getCommand(packageManager, scriptName, args) {
  if (scriptName === "install") {
    return packageManager === "yarn" ? "yarn" : `${packageManager} install`;
  }
  if (args) {
    return packageManager === "npm" ? `npm run ${scriptName} -- ${args}` : `${packageManager} ${scriptName} ${args}`;
  } else {
    return packageManager === "npm" ? `npm run ${scriptName}` : `${packageManager} ${scriptName}`;
  }
}

// utils/generateReadme.ts
var sfcTypeSupportDoc = [
  "",
  "## Type Support for `.vue` Imports in TS",
  "",
  "TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.",
  ""
].join("\n");
function generateReadme({
  projectName,
  packageManager,
  needsTypeScript,
  needsCypress,
  needsNightwatch,
  needsCypressCT,
  needsNightwatchCT,
  needsPlaywright,
  needsVitest,
  needsEslint
}) {
  const commandFor = (scriptName, args) => getCommand(packageManager, scriptName, args);
  let readme = `# ${projectName}

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).
${needsTypeScript ? sfcTypeSupportDoc : ""}
## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

`;
  let npmScriptsDescriptions = `\`\`\`sh
${commandFor("install")}
\`\`\`

### Compile and Hot-Reload for Development

\`\`\`sh
${commandFor("dev")}
\`\`\`

### ${needsTypeScript ? "Type-Check, " : ""}Compile and Minify for Production

\`\`\`sh
${commandFor("build")}
\`\`\`
`;
  if (needsVitest) {
    npmScriptsDescriptions += `
### Run Unit Tests with [Vitest](https://vitest.dev/)

\`\`\`sh
${commandFor("test:unit")}
\`\`\`
`;
  }
  if (needsCypressCT) {
    npmScriptsDescriptions += `
### Run Headed Component Tests with [Cypress Component Testing](https://on.cypress.io/component)

\`\`\`sh
${commandFor("test:unit:dev")} # or \`${commandFor("test:unit")}\` for headless testing
\`\`\`
`;
  }
  if (needsCypress) {
    npmScriptsDescriptions += `
### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

\`\`\`sh
${commandFor("test:e2e:dev")}
\`\`\`

This runs the end-to-end tests against the Vite development server.
It is much faster than the production build.

But it's still recommended to test the production build with \`test:e2e\` before deploying (e.g. in CI environments):

\`\`\`sh
${commandFor("build")}
${commandFor("test:e2e")}
\`\`\`
`;
  }
  if (needsNightwatch) {
    npmScriptsDescriptions += `
### Run End-to-End Tests with [Nightwatch](https://nightwatchjs.org/)

\`\`\`sh
# When using CI, the project must be built first.
${commandFor("build")}

# Runs the end-to-end tests
${commandFor("test:e2e")}
# Runs the tests only on Chrome
${commandFor("test:e2e", "--env chrome")}
# Runs the tests of a specific file
${commandFor("test:e2e", `tests/e2e/example.${needsTypeScript ? "ts" : "js"}`)}
# Runs the tests in debug mode
${commandFor("test:e2e", "--debug")}
\`\`\`
    `;
  }
  if (needsNightwatchCT) {
    npmScriptsDescriptions += `
### Run Headed Component Tests with [Nightwatch Component Testing](https://nightwatchjs.org/guide/component-testing/introduction.html)
  
\`\`\`sh
${commandFor("test:unit")}
${commandFor("test:unit -- --headless # for headless testing")}
\`\`\`
`;
  }
  if (needsPlaywright) {
    npmScriptsDescriptions += `
### Run End-to-End Tests with [Playwright](https://playwright.dev)

\`\`\`sh
# Install browsers for the first run
npx playwright install

# When testing on CI, must build the project first
${commandFor("build")}

# Runs the end-to-end tests
${commandFor("test:e2e")}
# Runs the tests only on Chromium
${commandFor("test:e2e", "--project=chromium")}
# Runs the tests of a specific file
${commandFor("test:e2e", "tests/example.spec.ts")}
# Runs the tests in debug mode
${commandFor("test:e2e", "--debug")}
\`\`\`
`;
  }
  if (needsEslint) {
    npmScriptsDescriptions += `
### Lint with [ESLint](https://eslint.org/)

\`\`\`sh
${commandFor("lint")}
\`\`\`
`;
  }
  readme += npmScriptsDescriptions;
  return readme;
}

// utils/getLanguage.ts
var fs3 = __toESM(require("fs"), 1);
var path3 = __toESM(require("path"), 1);
function linkLocale(locale) {
  let linkedLocale;
  try {
    linkedLocale = Intl.getCanonicalLocales(locale)[0];
  } catch (error) {
    console.log(`${error.toString()}
`);
  }
  switch (linkedLocale) {
    case "zh-TW":
    case "zh-HK":
    case "zh-MO":
      linkedLocale = "zh-Hant";
      break;
    case "zh-CN":
    case "zh-SG":
      linkedLocale = "zh-Hans";
      break;
    default:
      linkedLocale = locale;
  }
  return linkedLocale;
}
function getLocale() {
  const shellLocale = process.env.LC_ALL || // POSIX locale environment variables
  process.env.LC_MESSAGES || process.env.LANG || Intl.DateTimeFormat().resolvedOptions().locale || // Built-in ECMA-402 support
  "en-US";
  return linkLocale(shellLocale.split(".")[0].replace("_", "-"));
}
function getLanguage() {
  const locale = getLocale();
  const localesRoot = path3.resolve(__dirname, "locales");
  const languageFilePath = path3.resolve(localesRoot, `${locale}.json`);
  const doesLanguageExist = fs3.existsSync(languageFilePath);
  const lang = doesLanguageExist ? require(languageFilePath) : require(path3.resolve(localesRoot, "en-US.json"));
  return lang;
}

// utils/renderEslint.ts
var fs4 = __toESM(require("fs"), 1);
var path4 = __toESM(require("path"), 1);

// node_modules/.pnpm/@vue+create-eslint-config@0.4.1/node_modules/@vue/create-eslint-config/renderEjsFile.js
var import_ejs = __toESM(require_ejs(), 1);
var templates = { "./templates/eslint.config.mjs.ejs": "<%_ for (const { importer } of configsBeforeVuePlugin) { _%>\n<%- importer %>\n<%_ } _%>\nimport pluginVue from 'eslint-plugin-vue'\n<%_ for (const { importer } of configsAfterVuePlugin) { _%>\n<%- importer %>\n<%_ } _%>\n\nexport default [\n  {\n    name: 'app/files-to-lint',\n    files: ['**/*.{<%= fileExtensions.join(',') %>}'],\n  },\n\n  {\n    name: 'app/files-to-ignore',\n    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],\n  },\n\n  <%_ for (const { content } of configsBeforeVuePlugin) { _%>\n  <%- content %><%# TODO: auto-indent if content's multi-line %>\n  <%_ } _%>\n  ...pluginVue.configs['flat/essential'],\n  <%_ for (const { content } of configsAfterVuePlugin) { _%>\n  <%- content %><%# TODO: auto-indent if content's multi-line %>\n  <%_ } _%>\n]\n", "./templates/_editorconfig.ejs": "[*.{js,jsx,mjs,cjs,ts,tsx,mts,cts,vue}]\ncharset = utf-8\nindent_size = 2\nindent_style = space\ninsert_final_newline = true\ntrim_trailing_whitespace = true\n<%_ if (styleGuide === 'airbnb') { _%>\n<%# // standard doesn't have an opinion on line endings\n// https://github.com/standard/standard/issues/140\n// or maximum line length\n// https://github.com/standard/standard/issues/1559\n// so we only configure them for airbnb style\n%>\nend_of_line = lf\nmax_line_length = 100\n<%_ } _%>\n", "./templates/_prettierrc.json.ejs": `<%_ if (styleGuide === 'airbnb') { _%>
{
  "$schema": "https://json.schemastore.org/prettierrc",
  "arrowParens": "always",
  "bracketSameLine": false,
  "bracketSpacing": true,
  "endOfLine": "lf",
  "jsxSingleQuote": false,
  "printWidth": 100,
  "proseWrap": "preserve",
  "quoteProps": "as-needed",
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "all",
  "useTabs": false
}
<%_ } else if (styleGuide === 'standard') { _%>
{
  "$schema": "https://json.schemastore.org/prettierrc",
  "semi": false,
  "tabWidth": 2,
  "singleQuote": true,
  "printWidth": 100,
  "trailingComma": "all"
}
<%_ } else { _%>
<%#
  The default style follows the one used in the vuejs/core repository
  <https://github.com/vuejs/core/blob/main/.prettierrc>
%>
{
  "$schema": "https://json.schemastore.org/prettierrc",
  "semi": false,
  "singleQuote": true,
  "arrowParens": "avoid"
}
<%_ } _%>
` };
function renderEjsFile(filePath, data) {
  return import_ejs.default.render(templates[filePath], data, {});
}

// node_modules/.pnpm/@vue+create-eslint-config@0.4.1/node_modules/@vue/create-eslint-config/package.json
var package_default = {
  name: "@vue/create-eslint-config",
  version: "0.4.1",
  description: "Utility to setup ESLint in Vue.js projects.",
  type: "module",
  main: "index.js",
  bin: {
    "create-eslint-config": "bin/create-eslint-config.js"
  },
  engines: {
    node: "^16.14.0 || >= 18.0.0"
  },
  repository: {
    type: "git",
    url: "git+https://github.com/vuejs/create-eslint-config.git"
  },
  keywords: [
    "vue",
    "eslint",
    "config"
  ],
  author: "Haoqun Jiang <haoqunjiang+npm@gmail.com>",
  license: "MIT",
  bugs: {
    url: "https://github.com/vuejs/create-eslint-config/issues"
  },
  homepage: "https://github.com/vuejs/create-eslint-config#readme",
  publishConfig: {
    access: "public"
  },
  dependencies: {
    ejs: "^3.1.10",
    enquirer: "^2.4.1",
    kolorist: "^1.8.0"
  },
  devDependencies: {
    "@eslint/js": "^9.12.0",
    "@types/node": "^22.7.4",
    "@vue/eslint-config-prettier": "^10.0.0",
    "@vue/eslint-config-typescript": "^14.0.0",
    eslint: "^9.12.0",
    "eslint-plugin-vue": "^9.28.0",
    prettier: "^3.3.3",
    typescript: "~5.5.4"
  },
  scripts: {
    test: 'echo "Error: no test specified" && exit 1',
    lint: "eslint --fix ."
  }
};

// node_modules/.pnpm/@vue+create-eslint-config@0.4.1/node_modules/@vue/create-eslint-config/index.js
var versionMap = package_default.devDependencies;
function createConfig({
  styleGuide = "default",
  // default ~~| airbnb | standard~~ only the default is supported for now
  hasTypeScript = false,
  needsPrettier = false,
  additionalConfigs = []
}) {
  const pickDependencies = (keys) => pickKeysFromObject(versionMap, keys);
  const pkg = {
    devDependencies: pickDependencies(["eslint", "eslint-plugin-vue"])
  };
  const fileExtensions = ["vue"];
  if (hasTypeScript) {
    fileExtensions.unshift("ts", "mts", "tsx");
    additionalConfigs.unshift({
      devDependencies: pickDependencies(["@vue/eslint-config-typescript"]),
      afterVuePlugin: [
        {
          importer: "import vueTsEslintConfig from '@vue/eslint-config-typescript'",
          // TODO: supportedScriptLangs
          content: "...vueTsEslintConfig(),"
        }
      ]
    });
  } else {
    fileExtensions.unshift("js", "mjs", "jsx");
    additionalConfigs.unshift({
      devDependencies: pickDependencies(["@eslint/js"]),
      beforeVuePlugin: [
        {
          importer: "import js from '@eslint/js'",
          content: "js.configs.recommended,"
        }
      ]
    });
  }
  if (needsPrettier) {
    additionalConfigs.push({
      devDependencies: pickDependencies([
        "prettier",
        "@vue/eslint-config-prettier"
      ]),
      afterVuePlugin: [
        {
          importer: "import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'",
          content: "skipFormatting,"
        }
      ]
    });
  }
  const configsBeforeVuePlugin = [], configsAfterVuePlugin = [];
  for (const config of additionalConfigs) {
    deepMerge2(pkg.devDependencies, config.devDependencies ?? {});
    configsBeforeVuePlugin.push(...config.beforeVuePlugin ?? []);
    configsAfterVuePlugin.push(...config.afterVuePlugin ?? []);
  }
  const templateData = {
    styleGuide,
    fileExtensions,
    configsBeforeVuePlugin,
    configsAfterVuePlugin
  };
  const files = {
    "eslint.config.mjs": renderEjsFile(
      "./templates/eslint.config.mjs.ejs",
      templateData
    ),
    ".editorconfig": renderEjsFile(
      "./templates/_editorconfig.ejs",
      templateData
    )
  };
  if (needsPrettier) {
    files[".prettierrc.json"] = renderEjsFile(
      "./templates/_prettierrc.json.ejs",
      templateData
    );
  }
  return {
    pkg,
    files
  };
}
function pickKeysFromObject(obj, keys) {
  return keys.reduce((acc, key) => {
    if (key in obj) {
      acc[key] = obj[key];
    }
    return acc;
  }, {});
}
var isObject2 = (val) => val && typeof val === "object";
var mergeArrayWithDedupe2 = (a, b) => Array.from(/* @__PURE__ */ new Set([...a, ...b]));
function deepMerge2(target, obj) {
  for (const key of Object.keys(obj)) {
    const oldVal = target[key];
    const newVal = obj[key];
    if (Array.isArray(oldVal) && Array.isArray(newVal)) {
      target[key] = mergeArrayWithDedupe2(oldVal, newVal);
    } else if (isObject2(oldVal) && isObject2(newVal)) {
      target[key] = deepMerge2(oldVal, newVal);
    } else {
      target[key] = newVal;
    }
  }
  return target;
}

// template/eslint/package.json
var package_default2 = {
  devDependencies: {
    "@vitest/eslint-plugin": "1.1.7",
    "eslint-plugin-cypress": "^3.5.0",
    "eslint-plugin-playwright": "^1.6.2"
  }
};

// utils/renderEslint.ts
var eslintDeps = package_default2.devDependencies;
function renderEslint(rootDir, { needsTypeScript, needsVitest, needsCypress, needsCypressCT, needsPrettier, needsPlaywright }) {
  const additionalConfigs = getAdditionalConfigs({
    needsVitest,
    needsCypress,
    needsCypressCT,
    needsPlaywright
  });
  const { pkg, files } = createConfig({
    styleGuide: "default",
    hasTypeScript: needsTypeScript,
    needsPrettier,
    additionalConfigs
  });
  const scripts = {
    lint: "eslint . --fix"
  };
  if (needsPrettier) {
    scripts.format = "prettier --write src/";
  }
  const packageJsonPath = path4.resolve(rootDir, "package.json");
  const existingPkg = JSON.parse(fs4.readFileSync(packageJsonPath, "utf8"));
  const updatedPkg = sortDependencies(deepMerge_default(deepMerge_default(existingPkg, pkg), { scripts }));
  fs4.writeFileSync(packageJsonPath, JSON.stringify(updatedPkg, null, 2) + "\n", "utf8");
  for (const [fileName, content] of Object.entries(files)) {
    const fullPath = path4.resolve(rootDir, fileName);
    fs4.writeFileSync(fullPath, content, "utf8");
  }
}
function getAdditionalConfigs({
  needsVitest,
  needsCypress,
  needsCypressCT,
  needsPlaywright
}) {
  const additionalConfigs = [];
  if (needsVitest) {
    additionalConfigs.push({
      devDependencies: { "@vitest/eslint-plugin": eslintDeps["@vitest/eslint-plugin"] },
      afterVuePlugin: [
        {
          importer: `import pluginVitest from '@vitest/eslint-plugin'`,
          content: `
  {
    ...pluginVitest.configs['recommended'],
    files: ['src/**/__tests__/*'],
  },`
        }
      ]
    });
  }
  if (needsCypress) {
    additionalConfigs.push({
      devDependencies: { "eslint-plugin-cypress": eslintDeps["eslint-plugin-cypress"] },
      afterVuePlugin: [
        {
          importer: "import pluginCypress from 'eslint-plugin-cypress/flat'",
          content: `
  {
    ...pluginCypress.configs.recommended,
    files: [
      ${[
            ...needsCypressCT ? ["'**/__tests__/*.{cy,spec}.{js,ts,jsx,tsx}',"] : [],
            "cypress/e2e/**/*.{cy,spec}.{js,ts,jsx,tsx}",
            "cypress/support/**/*.{js,ts,jsx,tsx}"
          ].map(JSON.stringify.bind(JSON)).join(",\n      ")}
    ],
  },`
        }
      ]
    });
  }
  if (needsPlaywright) {
    additionalConfigs.push({
      devDependencies: { "eslint-plugin-playwright": eslintDeps["eslint-plugin-playwright"] },
      afterVuePlugin: [
        {
          importer: "import pluginPlaywright from 'eslint-plugin-playwright'",
          content: `
  {
    ...pluginPlaywright.configs['flat/recommended'],
    files: ['e2e/**/*.{test,spec}.{js,ts,jsx,tsx}'],
  },`
        }
      ]
    });
  }
  return additionalConfigs;
}

// index.ts
function isValidPackageName(projectName) {
  return /^(?:@[a-z0-9-*~][a-z0-9-*._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/.test(
    projectName
  );
}
function toValidPackageName(projectName) {
  return projectName.trim().toLowerCase().replace(/\s+/g, "-").replace(/^[._]/, "").replace(/[^a-z0-9-~]+/g, "-");
}
function canSkipEmptying(dir) {
  if (!fs5.existsSync(dir)) {
    return true;
  }
  const files = fs5.readdirSync(dir);
  if (files.length === 0) {
    return true;
  }
  if (files.length === 1 && files[0] === ".git") {
    return true;
  }
  return false;
}
function emptyDir(dir) {
  if (!fs5.existsSync(dir)) {
    return;
  }
  postOrderDirectoryTraverse(
    dir,
    (dir2) => fs5.rmdirSync(dir2),
    (file) => fs5.unlinkSync(file)
  );
}
async function init() {
  console.log();
  console.log(
    process.stdout.isTTY && process.stdout.getColorDepth() > 8 ? gradientBanner : defaultBanner
  );
  console.log();
  const cwd = process.cwd();
  const args = process.argv.slice(2);
  const options2 = {
    typescript: { type: "boolean" },
    ts: { type: "boolean" },
    "with-tests": { type: "boolean" },
    tests: { type: "boolean" },
    "vue-router": { type: "boolean" },
    router: { type: "boolean" },
    "vue-devtools": { type: "boolean" },
    devtools: { type: "boolean" }
  };
  const { values: argv, positionals } = (0, import_node_util.parseArgs)({
    args,
    options: options2,
    strict: false
  });
  console.log({ argv, positionals });
  const isFeatureFlagsUsed = typeof (argv.default ?? (argv.ts || argv.typescript) ?? argv.jsx ?? (argv.router || argv["vue-router"]) ?? argv.pinia ?? (argv.tests || argv["with-tests"]) ?? argv.vitest ?? argv.cypress ?? argv.nightwatch ?? argv.playwright ?? argv.eslint ?? argv["eslint-with-prettier"] ?? (argv.devtools || argv["vue-devtools"])) === "boolean";
  let targetDir = positionals[0];
  const defaultProjectName = !targetDir ? "new-project" : targetDir;
  const forceOverwrite = argv.force;
  const language = getLanguage();
  let result = {};
  try {
    result = await (0, import_prompts.default)(
      [
        {
          name: "projectName",
          type: targetDir ? null : "text",
          message: language.projectName.message,
          initial: defaultProjectName,
          onState: (state) => targetDir = String(state.value).trim() || defaultProjectName
        },
        {
          name: "shouldOverwrite",
          type: () => canSkipEmptying(targetDir) || forceOverwrite ? null : "toggle",
          message: () => {
            const dirForPrompt = targetDir === "." ? language.shouldOverwrite.dirForPrompts.current : `${language.shouldOverwrite.dirForPrompts.target} "${targetDir}"`;
            return `${dirForPrompt} ${language.shouldOverwrite.message}`;
          },
          initial: true,
          active: language.defaultToggleOptions.active,
          inactive: language.defaultToggleOptions.inactive
        },
        {
          name: "overwriteChecker",
          type: (prev, values) => {
            if (values.shouldOverwrite === false) {
              throw new Error(
                red("\u2716") + ` ${language.errors.operationCancelled}`
              );
            }
            return null;
          }
        },
        {
          name: "packageName",
          type: () => isValidPackageName(targetDir) ? null : "text",
          message: language.packageName.message,
          initial: () => toValidPackageName(targetDir),
          validate: (dir) => isValidPackageName(dir) || language.packageName.invalidMessage
        },
        {
          name: "needsTypeScript",
          type: () => isFeatureFlagsUsed ? null : "toggle",
          message: language.needsTypeScript.message,
          initial: false,
          active: language.defaultToggleOptions.active,
          inactive: language.defaultToggleOptions.inactive
        },
        {
          name: "needsJsx",
          type: () => isFeatureFlagsUsed ? null : "toggle",
          message: language.needsJsx.message,
          initial: false,
          active: language.defaultToggleOptions.active,
          inactive: language.defaultToggleOptions.inactive
        },
        {
          name: "needsRouter",
          type: () => isFeatureFlagsUsed ? null : "toggle",
          message: language.needsRouter.message,
          initial: false,
          active: language.defaultToggleOptions.active,
          inactive: language.defaultToggleOptions.inactive
        },
        {
          name: "needsPinia",
          type: () => isFeatureFlagsUsed ? null : "toggle",
          message: language.needsPinia.message,
          initial: false,
          active: language.defaultToggleOptions.active,
          inactive: language.defaultToggleOptions.inactive
        },
        {
          name: "needsVitest",
          type: () => isFeatureFlagsUsed ? null : "toggle",
          message: language.needsVitest.message,
          initial: false,
          active: language.defaultToggleOptions.active,
          inactive: language.defaultToggleOptions.inactive
        },
        {
          name: "needsE2eTesting",
          type: () => isFeatureFlagsUsed ? null : "select",
          hint: language.needsE2eTesting.hint,
          message: language.needsE2eTesting.message,
          initial: 0,
          choices: (prev, answers) => [
            {
              title: language.needsE2eTesting.selectOptions.negative.title,
              value: false
            },
            {
              title: language.needsE2eTesting.selectOptions.cypress.title,
              description: answers.needsVitest ? void 0 : language.needsE2eTesting.selectOptions.cypress.desc,
              value: "cypress"
            },
            {
              title: language.needsE2eTesting.selectOptions.nightwatch.title,
              description: answers.needsVitest ? void 0 : language.needsE2eTesting.selectOptions.nightwatch.desc,
              value: "nightwatch"
            },
            {
              title: language.needsE2eTesting.selectOptions.playwright.title,
              value: "playwright"
            }
          ]
        },
        {
          name: "needsEslint",
          type: () => isFeatureFlagsUsed ? null : "toggle",
          message: language.needsEslint.message,
          initial: false,
          active: language.defaultToggleOptions.active,
          inactive: language.defaultToggleOptions.inactive
        },
        {
          name: "needsPrettier",
          type: (prev, values) => {
            if (isFeatureFlagsUsed || !values.needsEslint) {
              return null;
            }
            return "toggle";
          },
          message: language.needsPrettier.message,
          initial: false,
          active: language.defaultToggleOptions.active,
          inactive: language.defaultToggleOptions.inactive
        },
        {
          name: "needsDevTools",
          type: () => isFeatureFlagsUsed ? null : "toggle",
          message: language.needsDevTools.message,
          initial: false,
          active: language.defaultToggleOptions.active,
          inactive: language.defaultToggleOptions.inactive
        }
      ],
      {
        onCancel: () => {
          throw new Error(red("\u2716") + ` ${language.errors.operationCancelled}`);
        }
      }
    );
  } catch (cancelled) {
    console.log(cancelled.message);
    process.exit(1);
  }
  console.log(result);
  const {
    projectName,
    packageName = projectName ?? defaultProjectName,
    shouldOverwrite = argv.force,
    needsJsx = argv.jsx,
    needsTypeScript = argv.ts || argv.typescript,
    needsRouter = argv.router || argv["vue-router"],
    needsPinia = argv.pinia,
    needsVitest = argv.vitest || argv.tests,
    needsEslint = argv.eslint || argv["eslint-with-prettier"],
    needsPrettier = argv["eslint-with-prettier"],
    needsDevTools = argv.devtools || argv["vue-devtools"]
  } = result;
  const { needsE2eTesting } = result;
  const needsCypress = argv.cypress || argv.tests || needsE2eTesting === "cypress";
  const needsCypressCT = needsCypress && !needsVitest;
  const needsNightwatch = argv.nightwatch || needsE2eTesting === "nightwatch";
  const needsNightwatchCT = needsNightwatch && !needsVitest;
  const needsPlaywright = argv.playwright || needsE2eTesting === "playwright";
  const root = path5.join(cwd, targetDir);
  if (fs5.existsSync(root) && shouldOverwrite) {
    emptyDir(root);
  } else if (!fs5.existsSync(root)) {
    fs5.mkdirSync(root);
  }
  const pkg = { name: packageName, version: "0.0.0" };
  fs5.writeFileSync(
    path5.resolve(root, "package.json"),
    JSON.stringify(pkg, null, 2)
  );
  const templateRoot = path5.resolve(__dirname, "template");
  const callbacks = [];
  const render = function render2(templateName) {
    const templateDir = path5.resolve(templateRoot, templateName);
    renderTemplate_default(templateDir, root, callbacks);
  };
  render("base");
  if (needsJsx) {
    render("config/jsx");
  }
  if (needsRouter) {
    render("config/router");
  }
  if (needsPinia) {
    render("config/pinia");
  }
  if (needsVitest) {
    render("config/vitest");
  }
  if (needsCypress) {
    render("config/cypress");
  }
  if (needsCypressCT) {
    render("config/cypress-ct");
  }
  if (needsNightwatch) {
    render("config/nightwatch");
  }
  if (needsNightwatchCT) {
    render("config/nightwatch-ct");
  }
  if (needsPlaywright) {
    render("config/playwright");
  }
  if (needsTypeScript) {
    render("config/typescript");
    render("tsconfig/base");
    const rootTsConfig = {
      // It doesn't target any specific files because they are all configured in the referenced ones.
      files: [],
      // All templates contain at least a `.node` and a `.app` tsconfig.
      references: [
        {
          path: "./tsconfig.node.json"
        },
        {
          path: "./tsconfig.app.json"
        }
      ]
    };
    if (needsCypress) {
      render("tsconfig/cypress");
      rootTsConfig.compilerOptions = {
        module: "NodeNext"
      };
    }
    if (needsCypressCT) {
      render("tsconfig/cypress-ct");
      rootTsConfig.references.push({
        path: "./tsconfig.cypress-ct.json"
      });
    }
    if (needsPlaywright) {
      render("tsconfig/playwright");
    }
    if (needsVitest) {
      render("tsconfig/vitest");
      rootTsConfig.references.push({
        path: "./tsconfig.vitest.json"
      });
    }
    if (needsNightwatch) {
      render("tsconfig/nightwatch");
      rootTsConfig.references.push({
        path: "./nightwatch/tsconfig.json"
      });
    }
    if (needsNightwatchCT) {
      render("tsconfig/nightwatch-ct");
    }
    fs5.writeFileSync(
      path5.resolve(root, "tsconfig.json"),
      JSON.stringify(rootTsConfig, null, 2) + "\n",
      "utf-8"
    );
  }
  if (needsEslint) {
    renderEslint(root, {
      needsTypeScript,
      needsVitest,
      needsCypress,
      needsCypressCT,
      needsPrettier,
      needsPlaywright
    });
    render("config/eslint");
  }
  if (needsPrettier) {
    render("config/prettier");
  }
  if (needsDevTools) {
    render("config/devtools");
  }
  const codeTemplate = (needsTypeScript ? "typescript-" : "") + (needsRouter ? "router" : "default");
  render(`code/${codeTemplate}`);
  if (needsPinia && needsRouter) {
    render("entry/router-and-pinia");
  } else if (needsPinia) {
    render("entry/pinia");
  } else if (needsRouter) {
    render("entry/router");
  } else {
    render("entry/default");
  }
  const dataStore = {};
  for (const cb of callbacks) {
    await cb(dataStore);
  }
  preOrderDirectoryTraverse(
    root,
    () => {
    },
    (filepath) => {
      if (filepath.endsWith(".ejs")) {
        const template = fs5.readFileSync(filepath, "utf-8");
        const dest = filepath.replace(/\.ejs$/, "");
        const content = import_ejs2.default.render(template, dataStore[dest]);
        fs5.writeFileSync(dest, content);
        fs5.unlinkSync(filepath);
      }
    }
  );
  if (needsTypeScript) {
    preOrderDirectoryTraverse(
      root,
      () => {
      },
      (filepath) => {
        if (filepath.endsWith(".js")) {
          const tsFilePath = filepath.replace(/\.js$/, ".ts");
          if (fs5.existsSync(tsFilePath)) {
            fs5.unlinkSync(filepath);
          } else {
            fs5.renameSync(filepath, tsFilePath);
          }
        } else if (path5.basename(filepath) === "jsconfig.json") {
          fs5.unlinkSync(filepath);
        }
      }
    );
    const indexHtmlPath = path5.resolve(root, "index.html");
    const indexHtmlContent = fs5.readFileSync(indexHtmlPath, "utf8");
    fs5.writeFileSync(
      indexHtmlPath,
      indexHtmlContent.replace("src/main.js", "src/main.ts")
    );
  } else {
    preOrderDirectoryTraverse(
      root,
      () => {
      },
      (filepath) => {
        if (filepath.endsWith(".ts")) {
          fs5.unlinkSync(filepath);
        }
      }
    );
  }
  const userAgent = process.env.npm_config_user_agent ?? "";
  const packageManager = /pnpm/.test(userAgent) ? "pnpm" : /yarn/.test(userAgent) ? "yarn" : /bun/.test(userAgent) ? "bun" : "npm";
  fs5.writeFileSync(
    path5.resolve(root, "README.md"),
    generateReadme({
      projectName: result.projectName ?? result.packageName ?? defaultProjectName,
      packageManager,
      needsTypeScript,
      needsVitest,
      needsCypress,
      needsNightwatch,
      needsPlaywright,
      needsNightwatchCT,
      needsCypressCT,
      needsEslint
    })
  );
  console.log(`
${language.infos.done}
`);
  if (root !== cwd) {
    const cdProjectName = path5.relative(cwd, root);
    console.log(
      `  ${bold(green(`cd ${cdProjectName.includes(" ") ? `"${cdProjectName}"` : cdProjectName}`))}`
    );
  }
  console.log(`  ${bold(green(getCommand(packageManager, "install")))}`);
  if (needsPrettier) {
    console.log(`  ${bold(green(getCommand(packageManager, "format")))}`);
  }
  console.log(`  ${bold(green(getCommand(packageManager, "dev")))}`);
  console.log();
}
init().catch((e) => {
  console.error(e);
});
/*! Bundled license information:

ejs/lib/ejs.js:
  (**
   * @file Embedded JavaScript templating engine. {@link http://ejs.co}
   * @author Matthew Eernisse <mde@fleegix.org>
   * @author Tiancheng "Timothy" Gu <timothygu99@gmail.com>
   * @project EJS
   * @license {@link http://www.apache.org/licenses/LICENSE-2.0 Apache License, Version 2.0}
   *)
*/
