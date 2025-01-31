import { RedisCommandArgument, RedisCommandArguments } from '.';
import { StreamStringsMessagesReply, transformReplyStreamStringMessages } from './generic-transformers';

export const FIRST_KEY_INDEX = 1;

export interface XAutoClaimOptions {
    COUNT?: number;
}

export function transformArguments(
    key: RedisCommandArgument,
    group: RedisCommandArgument,
    consumer: RedisCommandArgument,
    minIdleTime: number,
    start: string,
    options?: XAutoClaimOptions
): RedisCommandArguments {
    const args = ['XAUTOCLAIM', key, group, consumer, minIdleTime.toString(), start];

    if (options?.COUNT) {
        args.push('COUNT', options.COUNT.toString());
    }

    return args;
}

interface XAutoClaimReply {
    nextId: string;
    messages: StreamStringsMessagesReply;
}

export function transformReply(reply: [string, Array<any>]): XAutoClaimReply {
    return {
        nextId: reply[0],
        messages: transformReplyStreamStringMessages(reply[1])
    };
}
