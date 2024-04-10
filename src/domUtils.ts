export function clearChildren(ele: HTMLElement) {
    let child = ele.lastElementChild;
    while (child) {
        ele.removeChild(child);
        child = ele.lastElementChild;
    }
}
export function generateTileID(row: number, columns: number) {
    return `r${row}c${columns}`;
}

// use this only for animation.
export async function HTMLClassManager(
    i: number,
    j: number,
    add: Array<string>,
    remove: Array<string>,
    speed = 10
) {
    const tile = document.getElementById(generateTileID(i, j));
    if (tile === null) return;
    tile.classList.remove(...remove);
    tile.classList.add(...add);
    await sleep(speed);
}

function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
