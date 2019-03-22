const f = () => {
  const main: Element | null = document.querySelector("main");
  const form: Element | null = document.querySelector("main form");
  let text: string = "";
  let initialHTML: string = "";

  if (location.hash && location.hash.indexOf("#/") === 0) {
    text = atob(location.hash.split("#/")[1].split("/")[0]);
    initialHTML = (<HTMLMainElement>main).innerHTML;
    (<HTMLMainElement>main).innerHTML = "Loading...";
    if (typeof (<any>window).snarkdown === "function")
      text = (<any>window).snarkdown(text);
    (<HTMLMainElement>main).innerHTML = text;
    if (location.hash.split("#/")[1].split("/").length > 1) {
      setTimeout(() => {
        (<any>window).agastya.api("cssClass", location.hash.split("#/")[1].split("/")[1]);
      }, 200);
    }
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

interface Window { a11ySettings: any; agastya: any }

window.a11ySettings = window.a11ySettings || {};

document.addEventListener('click', function (event) {
  if ((<HTMLButtonElement>event.target).hasAttribute("data-option")) {
    window.agastya.api("toggleMode", (<HTMLButtonElement>event.target).getAttribute("data-option"));
  }
}, false);

(<HTMLElement>document.querySelector("#show-more-options")).addEventListener("click", (this) => {
  (<HTMLElement>document.querySelector("#show-more-options")).style.display = "none";
  (<HTMLElement>document.querySelector("#more-options")).classList.remove("hidden");
});

(<HTMLElement>document.querySelector("#agastya-toggler")).addEventListener("click", (this) => {
  (<HTMLElement>document.querySelector("#agastya-toggler .less")).classList.toggle("hidden");
  (<HTMLElement>document.querySelector("#agastya-toggler .more")).classList.toggle("hidden");
  (<HTMLElement>document.querySelector("#agastya-toggler .arrow-less")).classList.toggle("hidden");
  (<HTMLElement>document.querySelector("#agastya-toggler .arrow-more")).classList.toggle("hidden");
  (<HTMLElement>document.querySelector("#options-container")).classList.toggle("hidden");
});

window.addEventListener("hashchange", event => {
  f();
});
