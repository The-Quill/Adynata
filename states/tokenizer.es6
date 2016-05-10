import {Enum} from 'enumify';

export class CurrentState extends Enum {}
export class LiteralState extends Enum {}

CurrentState.initEnum(["TYPE_DECLARED", "MODIFIER_DECLARED", "NAMING", "ASSIGNMENT", "RETRIEVAL", "NONE", "INSIDE_STRING_SINGLE", "INSIDE_STRING_DOUBLE"])
LiteralState.initEnum(["STRING_OPEN", "STRING_CLOSED", "INTEGER_OPEN"])
