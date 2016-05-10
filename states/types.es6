import {Enum} from 'enumify';

export class AdynataTokenizerType extends Enum {}
export class KeywordStates extends Enum {}
export class NonAlphaType extends Enum {}
export class AlphaType extends Enum {}

AdynataTokenizerType.initEnum(["NON_ALPHA", "ALPHA"])
KeywordStates.initEnum(["START", "END", "NONE", "BOTH_ENDS"])
NonAlphaType.initEnum(["SCOPE", "LITERAL", "STRING_SINGLE", "STRING_DOUBLE", "WHITESPACE", "END_SCOPE_FORCEFULLY", "ASSIGNMENT", "ARRAY", "OBJECT", "PARAMETERS"])
AlphaType.initEnum(["KEYWORD", "VARIABLE_NAME", "STRING", "INTEGER", "HTML_ELEMENT", "VALUE_TYPE", "MODIFIER"])
