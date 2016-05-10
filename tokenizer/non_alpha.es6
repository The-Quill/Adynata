import { AdynataTokenizerType, KeywordStates, NonAlphaType } from '../states/types'
import { NonAlpha } from './types'

const NonAlphaChars = [
    new NonAlpha('{', NonAlphaType.SCOPE, KeywordStates.START),
    new NonAlpha('}', NonAlphaType.SCOPE, KeywordStates.END),

    new NonAlpha('{', NonAlphaType.OBJECT, KeywordStates.START),
    new NonAlpha('}', NonAlphaType.OBJECT, KeywordStates.END),

    new NonAlpha('(', NonAlphaType.SCOPE, KeywordStates.START),
    new NonAlpha(')', NonAlphaType.SCOPE, KeywordStates.END),

    new NonAlpha('(', NonAlphaType.PARAMETERS, KeywordStates.START),
    new NonAlpha(')', NonAlphaType.PARAMETERS, KeywordStates.END),

    new NonAlpha('[', NonAlphaType.ARRAY, KeywordStates.START),
    new NonAlpha(']', NonAlphaType.ARRAY, KeywordStates.END),

    new NonAlpha("=", NonAlphaType.ASSIGNMENT, KeywordStates.NONE),
    // Todo: Commas
    new NonAlpha('"', NonAlphaType.STRING_DOUBLE, KeywordStates.BOTH_ENDS),
    new NonAlpha("'", NonAlphaType.STRING_SINGLE, KeywordStates.BOTH_ENDS),

    new NonAlpha(";", NonAlphaType.END_SCOPE_FORCEFULLY, KeywordStates.NONE),
    new NonAlpha(" ", NonAlphaType.WHITESPACE, KeywordStates.NONE),
    
    new NonAlpha("\t", NonAlphaType.WHITESPACE, KeywordStates.NONE),
    new NonAlpha("\n", NonAlphaType.END_SCOPE_FORCEFULLY, KeywordStates.NONE),
    new NonAlpha("\r", NonAlphaType.END_SCOPE_FORCEFULLY, KeywordStates.NONE)
];
export { NonAlphaChars as default }
