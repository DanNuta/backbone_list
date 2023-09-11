document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
  const BookModel = Backbone.Model.extend({
    defaults: {
      title: "Un pamant nou",
      author: {
        name: "ECKHART",
        prenume: "TOLLE",
      },
      genre: "Spirituality, Psychology, Self-help book",
      pages: 336,
    },
  });

  const LiView = Backbone.View.extend({
    tagName: "li",
    className: "items",
    events: {
      click: "onClick",
    },

    onClick: function () {
      console.log(this.model);
    },
    initialize: function () {
      const author = this.model.get("author");
    },
    render: function () {
      this.$el.html(this.model.get("title"));
      return this;
    },
  });

  const BooksCollections = Backbone.Collection.extend({
    model: BookModel,
  });

  const booksCollections = new BooksCollections([
    new BookModel({
      title: "Puterea prezentului",
      author: {
        name: "ECKHART",
        prenume: "TOLLE",
      },
      genre: "Spirituality, Psychology, Self-help book",
      pages: 200,
    }),
    new BookModel({
      title: "Un pamant nou",
      author: {
        name: "ECKHART",
        prenume: "TOLLE",
      },
      genre: "Spirituality, Psychology, Self-help book",
      pages: 200,
    }),
  ]);

  const BookView = Backbone.View.extend({
    render: function () {
      this.$el.html();
      const self = this;
      this.model.each(function (item) {
        const liRender = new LiView({ model: item });
        self.$el.append(liRender.render().$el);
      });

      return this;
    },
  });

  const dynamicDom = new BookView({ el: "#ul", model: booksCollections });

  dynamicDom.render();

  const SpanView = Backbone.View.extend({
    tagName: "span",
    id: "title",
    className: "Title",

    render: function () {
      return this;
    },
  });

  const spanElement = new SpanView();

  const ListenModel = Backbone.Model.extend({
    defaults: {
      listeners: 0,
    },
  });

  const listener = new ListenModel({ title: "Carte" });

  window.eventListener = listener;

  const Listener = Backbone.View.extend({
    initialize: function () {
      this.model.on("change", this.onChangeModel, this);
    },

    onChangeModel: function () {
      console.log(this.model.get("listeners"));
    },

    render: function () {
      this.$el.html(`Listener un numar de ${this.model.get("listeners")} ori`);
      return this;
    },
  });

  const listen = new Listener({ el: ".listeners", model: listener });

  listen.render();

  //---------------------------------------------------------------------------

  const Elevi = Backbone.Model.extend({
    defaults: {
      name: "Nuta Dan",
    },
  });

  const EleviController = Backbone.Collection.extend({
    model: Elevi,
  });

  const listElevi = new EleviController([
    new Elevi({ id: 1, name: "Daniel Suruceanu" }),
    new Elevi({ id: 2, name: "Daniele Gribinet" }),
  ]);

  const ElevView = Backbone.View.extend({
    tagName: "li",
    className: "elev",

    events: {
      click: "onDelete",
    },

    onDelete: function () {
      const idModel = this.model.cid;
      listElevi.remove(listElevi.get(idModel));
    },

    render: function () {
      this.$el.html(this.model.get("name"));
      this.$el.attr("id", this.model.id);
      return this;
    },
  });

  const EleviRender = Backbone.View.extend({
    initialize: function () {
      this.model.on("add", this.addNewElev, this);
      this.model.on("remove", this.removeElev, this);
    },

    removeElev: function (elev) {
      this.$el.find(`li#${elev.id}`).remove();
    },

    addNewElev: function (data) {
      const newElev = new ElevView({ model: data });
      this.$el.append(newElev.render().$el);
    },

    render: function () {
      this.$el.html();
      const self = this;

      this.model.each(function (elev) {
        const elevView = new ElevView({ model: elev });
        self.$el.append(elevView.render().$el);
      });

      return this;
    },
  });

  const eleviRender = new EleviRender({ el: "#elevi", model: listElevi });
  eleviRender.render();

  const addNewName = document.querySelector("#new-name");
  const btnAdd = document.querySelector("#btn-add");

  btnAdd.addEventListener("click", function (e) {
    e.preventDefault();
    const value = addNewName.value;

    const newElev = listElevi.add({
      id: Math.floor(Math.random() * 1000),
      name: value,
    });
    addNewName.value = "";
  });
}
