import NonAlphaChars from './non_alpha'
import AlphaChars from './alpha'
import AdynataError from '../error'
import {
    KeywordStates,
    NonAlphaType,
    AlphaType
} from '../states/types'
import {
    CurrentState,
    LiteralState
} from '../states/tokenizer'

export default class AdynataTokenizer {
    constructor(Code, Index = 0) {
        this.Code = Code
        this.Index = Index

        this._Tokens = []
    }
    isAToken(name){
        return this._Tokens.map((token) => token.Name == name).includes(true)
    }
    getToken(name) {
        for (let i = 0, length = this._Tokens.length; i < length; i++) {
            if (this._Tokens[i].Name == name) {
                return this._Tokens[i]
            }
        }
    }
    getTokens(){
        return this._Tokens
    }
    setTokens(value){
        this._Tokens = value
    }
    charsListContains(charsList, value) {
        return charsList.map((char) => char.Character == value).includes(true)
    }
    charsListFindElem(charsList, value) {
        for (let i = 0, length = charsList.length; i < length; i++) {
            if (charsList[i].Character == value) {
                return charsList[i]
            }
        }
        return {
            Name: '',
            Type: null,
            Value: null,
            Mutability: null,
            OtherFactors: []
        }
    }
    getChar() {
        if (this.Index === this.Code.length) {
            return ""
        } else {
            return this.Code[this.Index++]
        }
    }
    guessType(value){
        if (String(value).startsWith('"') || String(value).startsWith("'")) {
            return this.charsListFindElem(AlphaChars, "string")
        } else if (!isNaN(value)){
            return this.charsListFindElem(AlphaChars, "int")
        } else {
            throw new AdynataError("Unknown type detected, use a type keyword instead")
        }

    }
    tokenize() {
        let state = CurrentState.NONE
        let currentlyBeingAssignedVariable = {
            Name: '',
            Type: null,
            Value: null,
            Mutability: null,
            OtherFactors: []
        }
        let resetCurrentVariable = () => (
            currentlyBeingAssignedVariable = {
                Name: '',
                Type: null,
                Value: null,
                Mutability: null,
                OtherFactors: []
            }
        )
        resetCurrentVariable()
        let currentChar = this.getChar()
        let builtUpAlphaCharacters = ''
        for (var i = 0; i < this.Code.length; i++) {
            if (this.charsListContains(NonAlphaChars, currentChar) || i == this.Code.length - 1) {
                if (state === CurrentState.INSIDE_STRING_SINGLE || state === CurrentState.INSIDE_STRING_DOUBLE){
                    builtUpAlphaCharacters += currentChar
                } else if (builtUpAlphaCharacters == '') {
                } else if (this.charsListContains(AlphaChars, builtUpAlphaCharacters)) {
                    let keyword = this.charsListFindElem(AlphaChars, builtUpAlphaCharacters)
                    //console.log(`AlphaChar at character#${i-1}: "${keyword.Character}" of type "${keyword.Type}"`)
                    if (keyword.Type === AlphaType.VALUE_TYPE){
                        if (state === CurrentState.NONE && state !== CurrentState.MODIFIER_DECLARED){
                            state = CurrentState.TYPE_DECLARED
                        }
                        currentlyBeingAssignedVariable.Type = keyword
                    } else if (keyword.Type === AlphaType.MODIFIER){
                        if (state === CurrentState.NONE){
                            state = CurrentState.MODIFIER_DECLARED
                        }
                        currentlyBeingAssignedVariable.Mutability = keyword
                    }
                    builtUpAlphaCharacters = ''
                } else {
                    if (state === CurrentState.ASSIGNMENT){
                       //console.log(`Value (${builtUpAlphaCharacters + currentChar}) to get attached to ${currentlyBeingAssignedVariable.Name}`)
                        //console.log(`Assignment at character#${i-1}: "${currentlyBeingAssignedVariable.Name}" to get value "${builtUpAlphaCharacters}"`)
                        let keyword = this.charsListFindElem(NonAlphaChars, currentChar)
                        if (keyword.Type === NonAlphaType.STRING_SINGLE || keyword.Type === NonAlphaType.STRING_DOUBLE){
                            if (this.isAToken(builtUpAlphaCharacters + currentChar)) {
                               //console.log(`${currentlyBeingAssignedVariable.Name} to get value of ${builtUpAlphaCharacters + currentChar}`)
                                currentlyBeingAssignedVariable.Value = this.getToken(builtUpAlphaCharacters + currentChar).Value
                            } else {
                                currentlyBeingAssignedVariable.Value = builtUpAlphaCharacters + currentChar
                            }
                        } else {
                            if (this.isAToken(builtUpAlphaCharacters)) {
                               //console.log(`${currentlyBeingAssignedVariable.Name} to get value of ${builtUpAlphaCharacters + currentChar}`)
                                currentlyBeingAssignedVariable.Value = this.getToken(builtUpAlphaCharacters).Value
                            } else {
                                currentlyBeingAssignedVariable.Value = builtUpAlphaCharacters
                            }
                        }
                        if (this.isAToken(currentlyBeingAssignedVariable.Name)) {
                            let retrievedToken = this.getToken(currentlyBeingAssignedVariable.Name)
                            if (retrievedToken.Mutability == this.charsListFindElem(AlphaChars, "const")) {
                                throw new AdynataError("Can't set a value on a constant variable.")
                            }
                            if (retrievedToken.Type.isValid(currentlyBeingAssignedVariable.Value)){
                                this._Tokens.splice(this._Tokens.indexOf(retrievedToken), 1)
                            }
                            let value = currentlyBeingAssignedVariable.Value
                            currentlyBeingAssignedVariable = retrievedToken
                            currentlyBeingAssignedVariable.Value = value
                        }
                        if (!currentlyBeingAssignedVariable.Type.isValid(currentlyBeingAssignedVariable.Value)){
                            throw new AdynataError(`Invalid value ("${currentlyBeingAssignedVariable.Value}") for the ${currentlyBeingAssignedVariable.Type.Character} type.`)
                        }
                        if (currentlyBeingAssignedVariable.Type.Character === "var"){
                            currentlyBeingAssignedVariable.Type = this.guessType(currentlyBeingAssignedVariable.Value)
                        }

                        this._Tokens.push(currentlyBeingAssignedVariable)
                        resetCurrentVariable()
                        state = CurrentState.NONE
                        builtUpAlphaCharacters = ''
                    } else if (state === CurrentState.TYPE_DECLARED){
                        if (this.isAToken(builtUpAlphaCharacters)) {
                            throw new AdynataError("You can't declare a variable twice.")
                        }
                        currentlyBeingAssignedVariable.Name = builtUpAlphaCharacters
                        builtUpAlphaCharacters = ''
                        state = CurrentState.NAMING
                    }
                }
                let keyword = this.charsListFindElem(NonAlphaChars, currentChar)
                //console.log(`NonAlphaChar at character#${i-1}: "${keyword.Character.replace("\n", "\\n").replace("\t", "\\t")}" of type "${keyword.Type}"`)
                if ((state === CurrentState.INSIDE_STRING_SINGLE && keyword.Type == NonAlphaType.STRING_SINGLE) ||
                    (state === CurrentState.INSIDE_STRING_DOUBLE && keyword.Type == NonAlphaType.STRING_DOUBLE)
                ){
                   //console.log(`Assignment at character#${i-1}: "${currentlyBeingAssignedVariable.Name}" to get value "${builtUpAlphaCharacters}"`)
                    if (currentlyBeingAssignedVariable.Type.Character === "var"){
                        currentlyBeingAssignedVariable.Type = this.guessType(builtUpAlphaCharacters)
                    }
                    if (!currentlyBeingAssignedVariable.Type.isValid(builtUpAlphaCharacters)){
                        throw new AdynataError(`Invalid value ("${builtUpAlphaCharacters}") for the ${currentlyBeingAssignedVariable.Type.Character} type.`)
                    }
                    currentlyBeingAssignedVariable.Value = builtUpAlphaCharacters
                    this._Tokens.push(currentlyBeingAssignedVariable)
                    resetCurrentVariable()
                    state = CurrentState.NONE
                    builtUpAlphaCharacters = ''
                } else if (state == CurrentState.NAMING && keyword.Type === NonAlphaType.ASSIGNMENT){
                    state = CurrentState.ASSIGNMENT
                    builtUpAlphaCharacters = ""
                } else if ((state !== CurrentState.INSIDE_STRING_SINGLE && state !== CurrentState.INSIDE_STRING_DOUBLE) &&
                    (  keyword.Type === NonAlphaType.STRING_SINGLE
                    || keyword.Type === NonAlphaType.STRING_DOUBLE)){

                    state = keyword.Type === NonAlphaType.STRING_SINGLE
                        ? CurrentState.INSIDE_STRING_SINGLE
                        : CurrentState.INSIDE_STRING_DOUBLE

                    builtUpAlphaCharacters += currentChar
                    //console.log(`Setting state at character#${i-1} to: "${state}"`)

                } else {
                    //The !keyword is giving issues

                    if (this.isAToken(builtUpAlphaCharacters) && state == CurrentState.NONE) {
                        let currentToken = this.getToken(builtUpAlphaCharacters)
                        currentlyBeingAssignedVariable.Name = currentToken.Name
                        currentlyBeingAssignedVariable.Type = currentToken.Type
                        state = CurrentState.ASSIGNMENT
                        builtUpAlphaCharacters = ''
                    } else if (state !== CurrentState.INSIDE_STRING_SINGLE && state !== CurrentState.INSIDE_STRING_DOUBLE && builtUpAlphaCharacters != '') {
                        throw new AdynataError(`Unknown variable (${builtUpAlphaCharacters}) at position #${i+1} of #${this.Code.length}.`)
                    }
                }
            } else {
                builtUpAlphaCharacters += currentChar
            }
            currentChar = this.getChar()
        }
       //console.log(this._Tokens)
    }
}
