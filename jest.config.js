module.exports = {
    roots: ["<rootDir>"],
    moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json"],
    testPathIgnorePatterns: ["<rootDir>[/\\\\](node_modules|.next)[/\\\\]"],
    transformIgnorePatterns: ["[/\\\\]node_modules[/\\\\].+\\.(ts|tsx)$"],
    transform: {
        "^.+\\.(ts|tsx)$": "babel-jest",
        "^.+\\.(bmp|gif|jpg|jpeg|mp4|png|psd|svg|webp)$": "<rootDir>/test/__mocks__/fileMock.js"
    },
    watchPlugins: ["jest-watch-typeahead/filename", "jest-watch-typeahead/testname"],
    moduleNameMapper: {
        "\\.(css|less|sass|scss)$": "identity-obj-proxy",
        "\\.(gif|ttf|eot|svg|png)$": "<rootDir>/test/__mocks__/fileMock.js"
    }
};
