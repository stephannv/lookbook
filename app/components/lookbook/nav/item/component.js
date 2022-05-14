export default function navItemComponent({ id, matchers }) {
  return {
    filteredOut: false,

    get open() {
      return this.isOpen(id);
    },

    get active() {
      if (this.$refs.link) {
        return this.location.pathname === this.$refs.link.getAttribute("href");
      }
      return false;
    },

    get children() {
      return Array.from(this.$refs.items.children);
    },

    get isCollection() {
      return !this.$refs.link;
    },

    toggle() {
      this.toggleOpen(id);
    },

    async filter(text) {
      if (this.isCollection) {
        await this.$nextTick();
        this.filteredOut = true;
        this.children.forEach(async (child) => {
          const data = Alpine.$data(child);
          await data.filter(text);
          if (!data.filteredOut) {
            this.filteredOut = false;
          }
        });
      } else {
        this.filteredOut = !this.match(text);
      }
      return this;
    },

    match(text) {
      if (text.length) {
        const matched = (matchers || []).map((m) => m.includes(text));
        return matched.filter((m) => m).length;
      }
      return true;
    },

    bindings: {
      toggle: {
        ["@click.stop"]: "toggle",
        ["x-ref"]: "toggle",
      },
      link: {
        [":class"]: "{'!bg-lookbook-nav-item-active':active}",
        ["x-ref"]: "link",
      },
    },
  };
}
