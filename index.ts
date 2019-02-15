const f = () => {
  const main: Element | null = document.querySelector("main");
  const form: Element | null = document.querySelector("main form");
  let text: string = "";
  let initialHTML: string = "";

  if (location.hash && location.hash.indexOf("#/") === 0) {
    text = atob(location.hash.split("#/")[1]);
    initialHTML = (<HTMLMainElement>main).innerHTML;
    (<HTMLMainElement>main).innerHTML = "Loading...";
    if (typeof (<any>window).snarkdown === "function")
      text = (<any>window).snarkdown(text);
    (<HTMLMainElement>main).innerHTML = text;
  } else if (form) {
    form.addEventListener("submit", event => {
      const textarea: Element | null = document.querySelector("form textarea");
      if (textarea) text = (<HTMLInputElement>textarea).value;
      const link: string = `${location.href.replace("index.html", "")}#/${btoa(
        text
      )}`;
      location.href = link;
      event.preventDefault();
      return false;
    });
  } else {
    (<HTMLMainElement>main).innerHTML = initialHTML;
  }
};
f();

window.addEventListener("hashchange", event => {
  f();
});
