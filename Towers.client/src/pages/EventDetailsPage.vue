<template>
  <div class="container-fluid">
    <!-- SECTION Top Card -->
    <div
      class="row p-0 backdrop rounded mt-4"
      :style="{ backgroundImage: `url(${event?.coverImg})` }"
    >
      <div class="col-md-12 opaque rounded">
        <div class="row py-3">
          <div class="col-md-5 d-flex align-text-center">
            <img :src="event?.coverImg" alt="" class="mini-pic rounded" />
          </div>
          <div class="col-md-7 d-flex flex-wrap justify-content-between">
            <div class="col-md-12">
              <div class="d-flex justify-content-between">
                <h3>{{ event?.name }}</h3>
                <!-- NOTE need to only show if creator -->
                 <button @click="cancelEvent()" class="btn btn-danger pe-3" v-if="event?.creatorId == account?.id">
                Cancel Event
              </button>
              </div>
              <h6>{{ event?.location }}</h6>
              <h6>{{ event?.startDate }}</h6>
            </div>
            <div class="mt-5 col-md-12">
              <p>{{ event?.description }}</p>
            </div>
            <div
              v-if="event?.capacity > 0"
              class="col-md-12 d-flex justify-content-between pe-2"
            >
              <p> Spots left: <div class="text-success">{{ event?.capacity }}</div></p>
              <button @click="addTicket()" class="btn btn-warning pe-3" v-if="!isAttending">
                Attend
              </button>
              <button @click="removeTicket()" class="btn btn-danger pe-3" v-else>
                Un-Attend
              </button>
            </div>
            <div v-else class="col-md-12 d-flex align-content-bottom">
              <h4 class="text-danger">This Event is Sold Out</h4>
            </div>
          </div>
          <!-- <div class=" col-md-7 d-flex justify-content-center align-content-center text-danger" v-else> 
            <h3 class="pt-3">
              This event has been canceled... sorry
            </h3>
          </div> -->
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12 d-flex flex-direction-row gap-3">
        <Ticket v-for="t in tickets" :key="t.id" :ticket="t"/>
      </div>
    </div>
    <div class="row">
      <div>
        <form action="submit" @submit.prevent="createComment()">
          <label class="py-2" for="body">Comment:</label>
          <textarea
          type="text"
          class="form-control"
          v-model="editable.body"
          name="body"
          rows="4"
          style="resize: none"
          >
        </textarea>
        <div class="col-12 d-flex justify-content-end py-2">
          <button type="submit" class="btn btn-info text-end"> Add Comment</button>
        </div>
      </form>
      </div>
      <h6>What people are saying:</h6>
      <div class="col-md-12 bg-secondary my-2 rounded">
        <div class="col-md-12 d-flex justify-content-between align-items-center my-3 bg-light rounded" v-for="c in comments">
        <Comment :key="c.id" :comment="c" class="p-3"/>
          <i
                class="mdi mdi-delete selectable text-danger rounded text-end px-3"
                @click.stop="removeComment(comments.id)"
              ></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref, watchEffect } from "vue";
import { useRoute } from "vue-router";
import { AppState } from "../AppState.js";
import { attendeesService } from "../services/AttendeesService.js";
import { AuthService } from "../services/AuthService.js";
import { commentsService } from "../services/CommentsService.js";
import { eventsService } from "../services/EventsService.js";
import Pop from "../utils/Pop.js";
import Ticket from "../components/Ticket.vue";
import Comment from "../components/Comment.vue";

export default {
    setup() {
        const editable = ref({
            comments: {},
        });
        watchEffect(() => {
          editable.value = { ...AppState.post };
        });
        const route = useRoute();
        async function getEventById() {
            try {
                await eventsService.getEventsById(route.params.id);
            }
            catch (error) {
                Pop.error(error, "[GetEvent]");
            }
        }
        async function getTicketsByEventId() {
            try {
                await attendeesService.getTicketsByEventId(route.params.id);
            }
            catch (error) {
                Pop.error(error, "[GetTickets]");
            }
        }
        async function getCommentsByEventId() {
            try {
                await commentsService.getCommentsByEventId(route.params.id);
            }
            catch (error) {
                Pop.error(error, "[GetComments]");
            }
        }
        onMounted(() => {
            getEventById();
            getTicketsByEventId();
            getCommentsByEventId();
        });
        return {
            editable,
            account: computed(() => AppState.account),
            comments: computed(() => AppState.comments),
            events: computed(()=> AppState.events),
            event: computed(() => AppState.activeEvent),
            tickets: computed(() => AppState.tickets),
            isAttending: computed(() => AppState.tickets.find(t => t.accountId == AppState.account.id)),
            async cancelEvent() {
                try {
                    const yes = await Pop.confirm("Are you sure you want to Cancel this event?");
                    if (!yes) {
                        return;
                    }
                  const event = AppState.activeEvent;
                    console.log(AppState.activeEvent);
                    await eventsService.cancelEvent(event.id);
                    Pop.success("You are no longer attending this event");
                }
                catch (error) {
                    Pop.error(error);
                }
            },
            async addTicket() {
                try {
                    if (!AppState.account.id) {
                        return AuthService.loginWithRedirect();
                    }
                    await attendeesService.addTicket({
                        eventId: AppState.activeEvent.id || route.params.id,
                    });
                    Pop.success("Thanks for coming to our event!");
                }
                catch (error) {
                    Pop.error(error);
                }
            },
            async removeTicket() {
                try {
                    const yes = await Pop.confirm("Are you sure you want to Un-Attend this event?");
                    if (!yes) {
                        return;
                    }
                    const ticket = AppState.tickets.find((t) => t.accountId == AppState.account.id &&
                        t.eventId == AppState.activeEvent.id);
                    await attendeesService.removeTicket(ticket.id);
                    Pop.success("You are no longer attending this event");
                }
                catch (error) {
                    Pop.error(error);
                }
            },
            async createComment() {
                try {
                    editable.value.eventId = route.params.id
                    await commentsService.createComment(editable.value);
                }
                catch (error) {
                    Pop.error(error);
                }
            },
            async removeComment() {
                try {
                    const yes = await Pop.confirm("Are you sure you want to delete your comment?");
                    if (!yes) {
                        return;
                    }
                    const comment = AppState.comments.find((c) => c.creatorId == AppState.account.id &&
                        c.eventId == AppState.activeEvent.id);
                    await commentsService.removeComment(comment.id);
                    Pop.success("Your Comment has been removed");
                }
                catch (error) {
                    Pop.error(error);
                }
            },
        };
    },
    components: { Ticket, Comment }
};
</script>

<style lang="scss" scoped>
.backdrop {
  height: 50vh;
  background-size: cover;
  background-position: center;
}
.opaque {
  background-color: rgba(35, 34, 34, 0.631);
}
.mini-pic {
  max-width: 30vw;
}
</style>
