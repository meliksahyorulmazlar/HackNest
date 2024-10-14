import { StacheElement, ObservableArray } from "//unpkg.com/can@pre/core.mjs";

class HackNest extends StacheElement {
  static view = `
    <div class="header"></div>
    <div class="result {{# if(this.liking) }}liking{{/ if }}
                       {{# if(this.noping) }}noping{{/ if }}"></div>
    <div class="images">
      <div class="current" style="left: {{ this.howFarWeHaveMoved }}px">
        <img
          alt="Current Profile Image"
          src="{{ this.currentProfile.img }}"
          draggable="false"
        >
      </div>
      <div class="next">
        <img alt="Next Profile Image" src="{{ this.nextProfile.img }}">
      </div>
    </div>

    <div class="footer">
      <button class="dissBtn" on:click="this.nope()">Dislike</button>
      <button class="likeBtn" on:click="this.like()">Like</button>
    </div>
  `;

  static props = {
    profiles: {
      get default() {
        return new ObservableArray([
          { name: "gru", img: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Joe_Locke_en_2022.jpg" },
          { name: "hannibal", img: "https://upload.wikimedia.org/wikipedia/commons/d/de/Madison_McLaughlin_2017.jpg" },
          { name: "joker", img: "https://image.cnbcfm.com/api/v1/image/104492231-GettyImages-132600846.jpg?v=1529475212&w=1600&h=900" },
          { name: "darth", img: "https://i.pinimg.com/564x/74/58/18/745818133dbe58a9d2b32a86a52abd73.jpg" },
          { name: "norman", img: "https://i.pinimg.com/564x/09/ae/5b/09ae5b5a29d3fb79c77a9ce7df952937.jpg" },
          { name: "stapuft", img: "https://upload.wikimedia.org/wikipedia/commons/4/4c/Korotkevich_ITMO.jpg" },
          { name: "dalek", img: "https://cdn.i-scmp.com/sites/default/files/styles/768x768/public/d8/images/canvas/2022/03/30/5779fb26-b131-41e3-b529-984317b08de8_df90e055.jpg?itok=EEHcDgEI&v=1648615049" },
          { name: "wickedwitch", img: "https://i.pinimg.com/736x/42/9f/43/429f433cb1dca97a883495e4189c4e76.jpg" },
          { name: "zod", img: "https://dirigeants-entreprise.com/images/t5347-800-800-50.jpg"
         },
          { name: "venom", img: "https://upload.wikimedia.org/wikipedia/commons/c/c4/Leah_Culver_1.jpg" }
        ]);
      }
    },

    howFarWeHaveMoved: Number,

    emptyProfile: {
      get default() {
        return {
          img: "https://media.istockphoto.com/id/1129235655/vector/hand-palm-icon.jpg?s=612x612&w=0&k=20&c=CxPcm9f1d27AebhCz-k3tGCQ57DwvzO3K8SOVzopvBE="
        };
      }
    },

    get currentProfile() {
      return this.profiles[0] || this.emptyProfile;
    },

    get nextProfile() {
      return this.profiles[1] || this.emptyProfile;
    },

    get liking() {
      return this.howFarWeHaveMoved >= 100;
    },

    get noping() {
      return this.howFarWeHaveMoved <= -100;
    }
  };

  like() {
    console.log("LIKED");
    this.profiles.shift();
  }

  nope() {
    console.log("NOPED");
    this.profiles.shift();
  }

  connected() {
    var current = this.querySelector(".current");
    var startingX;

    this.listenTo(current, "pointerdown", event => {
      startingX = event.clientX;

      this.listenTo(document, "pointermove", event => {
        this.howFarWeHaveMoved = event.clientX - startingX;
      });

      this.listenTo(document, "pointerup", event => {
        this.howFarWeHaveMoved = event.clientX - startingX;

        if (this.liking) {
          this.like();
        } else if (this.noping) {
          this.nope();
        }

        this.howFarWeHaveMoved = 0;
        this.stopListening(document);
      });
    });
  }
}

customElements.define("hack-nest", HackNest);
