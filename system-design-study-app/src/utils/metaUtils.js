// src/utils/metaUtils.js

export const setMetaTag = (name, content, isProperty = false) => {
  let element = document.querySelector(isProperty ? `meta[property='${name}']` : `meta[name='${name}']`);
  if (!element) {
    element = document.createElement('meta');
    if (isProperty) {
      element.setAttribute('property', name);
    } else {
      element.setAttribute('name', name);
    }
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
  // Return the element for potential further manipulation if needed, though not used in current setup
  return element;
};

export const removeMetaTag = (name, isProperty = false) => {
  const element = document.querySelector(isProperty ? `meta[property='${name}']` : `meta[name='${name}']`);
  if (element) {
    document.head.removeChild(element);
  }
};

export const setCanonicalLink = (href) => {
  let element = document.querySelector("link[rel='canonical']");
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', 'canonical');
    document.head.appendChild(element);
  }
  element.setAttribute('href', href);
  return element;
};

export const removeCanonicalLink = () => {
  const element = document.querySelector("link[rel='canonical']");
  if (element) {
    document.head.removeChild(element);
  }
};
