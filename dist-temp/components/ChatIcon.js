import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const ChatIcon = ({ unreadCount = 0, onClick, showBadge = true, size = "lg", className = "", }) => {
    const sizeClasses = {
        sm: "w-8 h-8",
        md: "w-10 h-10",
        lg: "w-12 h-12",
        xl: "w-16 h-16",
    };
    return (_jsxs("div", { className: `relative ${className}`, children: [_jsx("button", { onClick: onClick, className: `${sizeClasses[size]} bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg transition-all duration-200 flex items-center justify-center cursor-pointer`, children: _jsx("svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" }) }) }), showBadge && unreadCount > 0 && (_jsx("div", { className: "absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full min-w-[20px] h-5 flex items-center justify-center px-1", children: unreadCount > 99 ? "99+" : unreadCount }))] }));
};
