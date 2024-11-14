// utils.js
export const getVisibleSection = (sections) => {
    console.log("sections", sections)
    let visibleSectionId = null;
    sections.forEach((section) => {
        console.log("section", section)
        const rect = section?.getBoundingClientRect();
        if (rect?.top <= 150 && rect?.bottom >= 150) {
            visibleSectionId = section?.id;
        }
    });
    return visibleSectionId;
};
