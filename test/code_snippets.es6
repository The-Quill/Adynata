const CodeSnippets = {
    OneVar: {
        Int: {
            Broken: {
                Code: 'int a = "b";',
                Result: []
            },
            Working: {
                Code: 'int a = 2;',
                Result: [
                    {Name: "a", Value: '2'}
                ]
            }
        },
        String: {
            Broken: {
                Code: 'int a = 2;',
                Result: []
            },
            Working: {
                Code: 'int a = "b";',
                Result: [
                    {Name: "a", Value: '"b"'}
                ]
            }
        }
    },
    TwoVar: {
        Int: {
            Broken: {
                Code: 'string a = "b"; int b = a;',
                Result: []
            },
            Working: {
                Code: 'int a = 3; int b = 4;',
                Result: [
                    {Name: "a", Value: '3'},
                    {Name: "b", Value: '3'}
                ]
            }
        },
        String: {
            Broken: {
                Code: 'string a = 2; string b = a;',
                Result: []
            },
            Working: {
                Code: 'string a = "b"; string b = "dog";',
                Result: [
                    {Name: "a", Value: '"b"'},
                    {Name: "b", Value: '"b"'}
                ]
            }
        }
    },
    Reassignment: {
        Int: {
            Broken: {
                Code: 'string a = "b"; int b = a;',
                Result: []
            },
            Working: {
                Code: 'int a = 3; int b = 4; int c = b;',
                Result: [
                    {Name: "a", Value: '3'},
                    {Name: "b", Value: '3'}
                ]
            }
        },
        String: {
            Broken: {
                Code: 'int a = 2; string b = a; b = 32;',
                Result: []
            },
            Working: {
                Code: 'string a = "b"; string c = "dog"; c = b;',
                Result: [
                    {Name: "a", Value: '"b"'},
                    {Name: "b", Value: '"b"'}
                ]
            }
        }
    },
    Scopes: {
        Function: {
            Anonymous: {
                Broken: {
                    Code: 'function {\n}',
                    Result: []
                },
                Working: {
                    Code: 'function(){\n    console.print("cats")}',
                    Result: [
                        {Name: "cat", Value: 'console.print("cats")'}
                    ]
                }
            },
            Declared: {
                Broken: {
                    Code: 'function cat{\n}',
                    Result: []
                },
                Working: {
                    Code: 'function cat(){\n    console.print("cats")}',
                    Result: [
                        {Name: "cat", Value: 'console.print("cats")'}
                    ]
                }
            }
        },
        For: {
            Broken: {
                Code: 'for (i)',
                Result: []
            },
            Working: {
                Code: 'for (int i = 0; i < 100; i++){\n    console.print(i);\n}',
                Result: [
                    //{Name: "a", Value: '"b"'}
                ]
            }
        }
    }
};
export { CodeSnippets as default }
