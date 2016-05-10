import { AdynataTokenizerType, KeywordStates, AlphaType } from '../states/types'
import { Alpha } from './types'

const AlphaChars = [
    new Alpha('const', AlphaType.MODIFIER),
    new Alpha('var', AlphaType.VALUE_TYPE),
    new Alpha('int', AlphaType.VALUE_TYPE, (value) => !isNaN(value) ),
    new Alpha('string', AlphaType.VALUE_TYPE, (value) => String(value) && (value.startsWith('"') || value.startsWith("'")) ),
    new Alpha('HTMLElement', AlphaType.VALUE_TYPE),
    new Alpha('object', AlphaType.VALUE_TYPE, (value) => Object(value) ),
    new Alpha('array', AlphaType.VALUE_TYPE, (value) => Array(value) ),
    
    new Alpha('new', AlphaType.KEYWORD),
    new Alpha('for', AlphaType.KEYWORD),
    new Alpha('while', AlphaType.KEYWORD)
];
export { AlphaChars as default }
