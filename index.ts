const f = () => {
  const main: Element | null = document.querySelector("main");
  const form: Element | null = document.querySelector("main form");
  let text: string = "";
  let initialHTML: string = "";

  if (location.href && location.href.indexOf("text/") !== -1) {
    text = atob(location.href.split("text/")[1].split("/")[0]);
    initialHTML = (<HTMLMainElement>main).innerHTML;
    (<HTMLMainElement>main).innerHTML = "Loading...";
    if (typeof (<any>window).snarkdown === "function")
      text = (<any>window).snarkdown(text);
    (<HTMLMainElement>main).innerHTML = text;
  } else if (form) {
    form.addEventListener("submit", event => {
      const textarea: Element | null = document.querySelector("form textarea");
      if (textarea) text = (<HTMLInputElement>textarea).value;
      const link: string = `$/text/${btoa(
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

interface Window { a11ySettings: any; agastya: any }

window.a11ySettings = window.a11ySettings || {};

document.addEventListener('click', function (event) {
  if ((<HTMLButtonElement>event.target).hasAttribute("data-option")) {
    window.agastya.api("toggleMode", (<HTMLButtonElement>event.target).getAttribute("data-option"));
  }
}, false);

(<HTMLElement>document.querySelector("#show-more-options")).addEventListener("click", () => {
  (<HTMLElement>document.querySelector("#show-more-options")).style.display = "none";
  (<HTMLElement>document.querySelector("#more-options")).classList.remove("hidden");
});

(<HTMLElement>document.querySelector("#agastya-toggler")).addEventListener("click", () => {
  (<HTMLElement>document.querySelector("#agastya-toggler .less")).classList.toggle("hidden");
  (<HTMLElement>document.querySelector("#agastya-toggler .more")).classList.toggle("hidden");
  (<HTMLElement>document.querySelector("#agastya-toggler .arrow-less")).classList.toggle("hidden");
  (<HTMLElement>document.querySelector("#agastya-toggler .arrow-more")).classList.toggle("hidden");
  (<HTMLElement>document.querySelector("#options-container")).classList.toggle("hidden");
});

window.addEventListener("hashchange", event => {
  f();
});
