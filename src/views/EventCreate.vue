
  <template>
  <div>
    <h1>Create an Event</h1>
    <form @submit.prevent="createEvent">
      <h3>Name & describe your event</h3>
      <BaseInput
        class="field"
        label="Title"
        v-model="event.title"
        type="text"
        placeholder="Add A Name"
        :class="{error: $v.event.title.$error }"
        @blur="$v.event.title.$touch()"
      />
      <template v-if="$v.event.title.$error">
        <p v-if="!$v.event.title.required" class="errorMessage">Title Is Required. </p>
      </template>

      <BaseInput
        class="field"
        label="Description"
        v-model="event.description"
        type="text"
        placeholder="Add A Description"
        :class="{error: $v.event.title.$error }"
        @blur="$v.event.description.$touch()"
      />
      <template v-if="$v.event.description.$error">
        <p v-if="!$v.event.description.required" class="errorMessage">Description Is Required. </p>
      </template>

      <h3>Where is your event?</h3>
      <BaseInput
        class="field"
        label="Location"
        v-model="event.location"
        type="text"
        placeholder="Add a location"
        :class="{error: $v.event.title.$error }"
        @blur="$v.event.location.$touch()"
      />
      <template v-if="$v.event.location.$error">
        <p v-if="!$v.event.location.required" class="errorMessage">Location Is Required. </p>
      </template>

      <h3>When is your event?</h3>
      <div class="field">
        <label>Date</label>
        <datepicker
          v-model="event.date"
          placeholder="Select a date"
          :input-class="{ error: $v.event.date.$error}"
          @closed="$v.event.date.$touch()"
          />
      </div>

      <template v-if="$v.event.date.$error">
        <p v-if="!$v.event.date.required" class="errorMessage">date Is Required. </p>
      </template>

      <div class="field">
        <label>Select a time</label>
        <select v-model="event.time">
          <option v-for="time in times" :key="time">{{ time }}</option>
        </select>
      </div>

      <!-- <input type="submit" class="button -fill-gradient" value="Submit"/> -->
      <BaseButton type="submit" buttonClass="-fill-gradient">Submit</BaseButton>
      <p v-if="$v.$anyError" class="errorMessage">Please Fill Out The Required Field(s)</p>
    </form>
  </div>
</template>


<script>
import Datepicker from "vuejs-datepicker";
import NProgress from "nprogress";
import { required } from 'vuelidate/lib/validators';

export default {
  components: {
    Datepicker,
  },

  data() {
    const times = [];

    for (var i = 1; i < 24; i++) {
      times.push(i + ":00 ");
    }

    return {
      times,
      event: this.createFreshEventObject(),
    };
  },

  validations: {
    event: {
      userId: { required },
      title: { required },
      description: { required },
      location: { required },
      date: { required },
      time: { required },
    }
  },

  methods: {
    createFreshEventObject() {
      const user = this.$store.state.user.user;
      const id = Math.floor(Math.random() * 100000000);

      return {
        id,
        userId: user.id,
        title: "",
        description: "",
        location: "",
        date: "",
        time: "",
      };
    },

    createEvent() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        NProgress.start();
        this.$store
          .dispatch("event/createEvent", this.event)
          .then(() => {
            this.$router.push({
              name: "event-show",
              params: { id: this.event.id },
            });
            this.event = createFreshEventObject();
          })
          .catch(() => {
            NProgress.done();
          });
      }
    },
  },
};
</script>

<style lang="css" scoped>
.field {
  margin-bottom: 24px;
}
</style>
