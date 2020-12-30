export const imageUrlExists = async (url) => {
  return await new Promise(resolve => {
    let img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
  })
}
