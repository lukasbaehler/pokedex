export function buildShareUrl(name, desc, ids) {
    const params = new URLSearchParams();
    params.set('name', name);
    if (desc) {
        params.set('desc', desc);
    }
    params.set('ids', ids.join(','))
    return `${window.location.origin}/share?${params.toString()}`;
}