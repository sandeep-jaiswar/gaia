"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const Button = ({ onClick }) => {
    return ((0, jsx_runtime_1.jsx)("button", { onClick: onClick, children: "Click Me" }));
};
exports.default = Button;
