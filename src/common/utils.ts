export function log() {
    console.log('log');
}

/**
 * Create a quick lookup map from list
 */
export function createMap(arr: (string|number)[]): { [string: string]: boolean;[number: number]: boolean } {
    return arr.reduce((result: { [string: string]: boolean }, key: string) => {
        result[key] = true;
        return result;
    }, <{ [string: string]: boolean }>{});
}

/** Sloppy but effective code to find distinct */
export function distinct(arr: string[]): string[] {
    var map = createMap(arr);
    return Object.keys(map);
}

/**
 * Debounce
 */
var now = () => new Date().getTime();
export function debounce<T extends Function>(func: T, milliseconds: number, immediate = false): T {
    var timeout, args, context, timestamp, result;

    var wait = milliseconds;

    var later = function() {
        var last = now() - timestamp;

        if (last < wait && last > 0) {
            timeout = setTimeout(later, wait - last);
        } else {
            timeout = null;
            if (!immediate) {
                result = func.apply(context, args);
                if (!timeout) context = args = null;
            }
        }
    };

    return <any>function() {
        context = this;
        args = arguments;
        timestamp = now();
        var callNow = immediate && !timeout;
        if (!timeout) timeout = setTimeout(later, wait);
        if (callNow) {
            result = func.apply(context, args);
            context = args = null;
        }

        return result;
    };
};

export function rangeLimited(num: number, min: number, max: number, loopAround = false) {
    var limited = Math.max(Math.min(num, max), min);
    if (loopAround && limited > num){
        return max;
    }
    if (loopAround && limited < num){
        return min;
    }
    return limited;
}