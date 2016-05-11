#Adynata

My horrible first attempt at a programming language.

Attributes: static typing, no type coercion.

It's still majorly in development, so expect it to break.

Contributors:

 - Just me ;-;
 - If you're masochistic with a ES6 fetish, feel free to PR some time ;)

##Sample Programs:

There's a bunch of sample programs in the [sample_programs] directory, and I included some below.

    const int length = 10;
    for (var i = 0; i < length; i++){
        string total = "";
        if (i % 3){
            total += "Fizz";
        }
        if (i % 5){
            total += "Buzz";
        }
        console.print(total == "" ? i : total);
    }

I'm planning for a HTML literal type.

    HTMLElement header = <header>My Site</header>;
    header.children.append(<a>Home</a>);
    header.children.append(<a>Contact Us</a>);
    header.children.append(<a>Gallery</a>);

and maybe a Vector or Point literal type:

    Vector a = <1, 1>;
    Vector b = <2, 2>;
    console.print(a . b); // 4

#Roadmap:

 - <s>Get the parser working</s>
 - <s>Get the REPL working</s>
 - <s>Start the tokenizer</s>
 - <s>Get variable assignment working/s>
 - Get scopes working
 - Get loops working
 - Get the extended literal set working
 - Get the inbuilt libraries working