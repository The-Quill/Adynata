import { AdynataTokenizerType, NonAlphaType, AlphaType, KeywordStates } from '../states/types'

export class AdynataTokenizerKeyword {
    constructor(keywordType, character, type, state){
        this.Character = character
        this.Type = type
        this.State = state
        switch (keywordType){
            case AdynataTokenizerType.NON_ALPHA:
                this.KeywordType = AdynataTokenizerType.NON_ALPHA
                break
            case AdynataTokenizerType.ALPHA:
                this.KeywordType = AdynataTokenizerType.ALPHA
                break
        }
    }
}
export class NonAlpha extends AdynataTokenizerKeyword {
    constructor(character, type, state){
        if (!(type instanceof NonAlphaType)){
            type = NonAlphaType.LITERAL
        }
        if (!(state instanceof KeywordStates)){
            state = KeywordStates.START
        }
        super(AdynataTokenizerType.NON_ALPHA, character, type, state)
    }
    get character(){
        return super.Character
    }
    get type(){
        return super.Type
    }
    set type(type){
        super.Type = type
    }
    set character(character){
        super.Character = character
    }
    get state(){
        return super.State
    }
    set state(state){
        super.State = state
    }
}
export class Alpha extends AdynataTokenizerKeyword {
    constructor(character, type, typeChecker){
        if (!(type instanceof AlphaType)){
            type = AlphaType.KEYWORD
        }
        super(AdynataTokenizerType.ALPHA, character, type, KeywordStates.NONE)
        this.isValid = typeChecker || function(){ return true }
    }
    get character(){
        return super.Character
    }
    get type(){
        return super.Type
    }
    set type(type){
        super.Type = type
    }
    set character(character) {
        super.Character = character
    }
}