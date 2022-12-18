const documentRes = () => {
    const doc = document.documentElement
    doc.style.setProperty('--doc-height', `${window.innerHeight}px`)
    doc.style.setProperty('--doc-width', `${window.innerWidth}px`)
}
window.addEventListener('resize', documentRes)
documentRes()