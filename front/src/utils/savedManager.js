export const getSaved = () => {
    return JSON.parse(localStorage.getItem("studyhub_saved")) || {
      worksheets: [],
      questionPapers: []
    };
  };
  
  export const toggleSaved = (type, id) => {
    const data = getSaved();
  
    if (!data[type]) data[type] = [];
  
    if (data[type].includes(id)) {
      data[type] = data[type].filter(item => item !== id);
    } else {
      data[type].push(id);
    }
  
    localStorage.setItem("studyhub_saved", JSON.stringify(data));
  };
  
  export const isSaved = (type, id) => {
    const data = getSaved();
    return data[type]?.includes(id);
  };