<template>
    <v-row>
        <v-col cols="12">
            <v-card flat>
                <v-card-title
                    class="secondary--text font-weight-bold align-center"
                    >Item Details</v-card-title
                >
                <v-card-subtitle class="primary--text"
                    >Items for Sale: Laptops/PDAs</v-card-subtitle
                >
                <v-list-item three-line>
                    <v-list-item-content>
                        <v-list-item-title
                            class="primary--text font-weight-bold"
                            >Lenovo Ideapad Slim3 Core i5 10Gen 1.0 Ghz 512Gb
                            SSd 2Gb Nvidia mx330</v-list-item-title
                        >
                        <v-list-item-subtitle
                            class="success--text font-weight-bold"
                            >PHP 24800.00</v-list-item-subtitle
                        >
                        <v-list-item-subtitle>
                            <span class="font-weight-bold success--text"
                                >Already Used</span
                            >
                            <span class="mx-1">with</span>
                            <span class="font-weight-bold success--text"
                                >Personal Warranty</span
                            >
                        </v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>

                <v-card-text>
                    <v-card color="#f0f0f0" flat outlined>
                        <v-list-item three-line>
                            <v-list-item-avatar>
                                <v-img
                                    src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
                                ></v-img>
                            </v-list-item-avatar>
                            <v-list-item-content>
                                <v-list-item-title class="d-flex align-center"
                                    ><span
                                        class="primary--text font-weight-bold mr-1"
                                        >bastilavar21</span
                                    >
                                    <v-chip small class="font-weight-bold"
                                        >Seller</v-chip
                                    >
                                </v-list-item-title>
                                <v-list-item-subtitle
                                    >on May 14, 2021 01:05
                                    PM</v-list-item-subtitle
                                >
                                <v-list-item-subtitle
                                    >Location:
                                    <span
                                        class="font-weight-bold secondary--text"
                                        >Quezon City, Metro Manila</span
                                    ></v-list-item-subtitle
                                >
                            </v-list-item-content>
                            <v-list-item-action>
                                <v-tooltip bottom>
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn
                                            color="primary"
                                            icon
                                            v-bind="attrs"
                                            v-on="on"
                                        >
                                            <v-icon>mdi-message-text</v-icon>
                                        </v-btn>
                                    </template>
                                    <span>Inquire</span>
                                </v-tooltip>
                            </v-list-item-action>
                        </v-list-item>

                        <v-card-text>
                            <v-row dense>
                                <v-col col="12" md="6">
                                    <div class="d-flex">
                                        <span class="mr-1">
                                            <rating-status-chip
                                                rating="positive"
                                            ></rating-status-chip>
                                        </span>
                                        <span> 100% (678 feedbacks) </span>
                                    </div>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <div class="d-flex">
                                        <span class="mr-1">
                                            <rating-status-chip
                                                rating="negative"
                                            ></rating-status-chip>
                                        </span>
                                        <span> 0% (0 feedbacks) </span>
                                    </div>
                                </v-col>
                            </v-row>
                        </v-card-text>

                        <v-toolbar flat color="transparent" dense>
                            <v-spacer></v-spacer>
                            <v-toolbar-items>
                                <v-tooltip bottom>
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn
                                            icon
                                            small
                                            v-bind="attrs"
                                            v-on="on"
                                            ><v-icon small
                                                >mdi-bookmark</v-icon
                                            ></v-btn
                                        >
                                    </template>
                                    <span>Bookmark</span>
                                </v-tooltip>

                                <v-tooltip bottom>
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn
                                            icon
                                            small
                                            v-bind="attrs"
                                            v-on="on"
                                            ><v-icon small
                                                >mdi-alert</v-icon
                                            ></v-btn
                                        >
                                    </template>
                                    <span>Report to Admin</span>
                                </v-tooltip>
                            </v-toolbar-items>
                        </v-toolbar>
                    </v-card>
                </v-card-text>

                <v-card-text class="secondary--text">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Accusamus at dicta, eaque facilis id illo itaque, iusto
                    neque nobis non, provident quia repellat sapiente unde
                    voluptatum. A ab aliquid architecto asperiores at cum
                    deserunt doloremque dolores ducimus ea exercitationem illum
                    ipsum magnam molestiae, nemo nihil officia possimus quo,
                    ratione saepe sapiente suscipit vero vitae. Architecto
                    beatae et facilis minima mollitia nisi quo repudiandae
                    suscipit tenetur totam! Animi aperiam corporis ducimus
                    explicabo harum, rem! Accusamus aliquam aperiam beatae
                    blanditiis culpa cupiditate delectus, deleniti deserunt
                    doloremque dolores esse eum ex fugit impedit in, ipsa iusto
                    laudantium nemo neque nesciunt non nulla obcaecati
                    praesentium provident quaerat quidem quo repellat
                    repellendus reprehenderit repudiandae saepe ut vel veniam!
                    Aliquam, at corporis exercitationem in obcaecati perferendis
                    sed sit totam? Accusamus consectetur cumque dicta velit? A
                    aperiam deleniti, distinctio explicabo neque nobis odio
                    placeat reiciendis voluptas. Ducimus eos, maxime modi
                    mollitia nobis sapiente temporibus! Aperiam aut culpa dolore
                    earum, eos expedita explicabo fugit, nam nostrum officiis
                    possimus praesentium quasi saepe soluta unde! Culpa delectus
                    deserunt doloribus eum eveniet exercitationem expedita,
                    fugit id illum natus neque odio officia optio perferendis
                    provident quas quod reprehenderit similique totam vitae?
                    Consequuntur dicta dignissimos eligendi eos hic, labore
                    molestias nobis officia quaerat, soluta totam ullam, vel
                    voluptas. Amet aut culpa cupiditate dignissimos dolorum eum
                    expedita id illo ipsa libero, nobis non odio reprehenderit.
                    Deleniti dignissimos dolores harum provident quaerat ratione
                    rem sunt voluptates. Harum ipsa officiis porro repellendus?
                    At blanditiis debitis dignissimos error est ex
                    exercitationem facere facilis inventore ipsum iusto minima
                    officia qui recusandae, rem sint soluta. Animi corporis cum,
                    distinctio molestias mollitia obcaecati possimus rem
                    voluptatem? Assumenda debitis iste magni, odio praesentium
                    quis tempora. Commodi consequatur cum debitis dicta eos
                    explicabo fugit hic illum iste iure labore, laborum magni
                    minima molestias natus non numquam officiis optio quibusdam,
                    quod sint, soluta tempora ullam unde velit voluptate
                    voluptatum. Ad blanditiis commodi consequuntur cumque enim
                    incidunt ipsum necessitatibus, sapiente temporibus voluptas.
                    A animi, consequatur, distinctio doloribus error harum
                    incidunt ipsa iusto nulla numquam quibusdam reprehenderit
                    sapiente, sed tempore vitae! Ab consequuntur dolore expedita
                    laborum, laudantium nihil officiis quidem quisquam soluta
                    unde. Asperiores blanditiis commodi, debitis dolores ducimus
                    eius esse expedita iusto nihil, non omnis porro quidem quo
                    repellendus sint tenetur totam vitae! Ad animi beatae hic id
                    incidunt ipsam, itaque laudantium libero maiores minima,
                    modi nemo neque nobis officia pariatur praesentium, sit
                    temporibus voluptatibus. Accusamus aspernatur autem
                    blanditiis consequatur consequuntur culpa cupiditate dolorum
                    eligendi enim eos excepturi expedita explicabo facere hic id
                    ipsam magni maxime minima nam necessitatibus neque nihil
                    nisi numquam, odio officiis pariatur, porro quis quos
                    recusandae rerum soluta sunt suscipit totam unde veniam vero
                    voluptatum! Blanditiis debitis fuga itaque minima minus nam,
                    nulla omnis quos suscipit ullam! A accusamus, animi, aperiam
                    consequatur, doloribus excepturi id impedit in nam nemo nisi
                    odio odit placeat praesentium repellendus repudiandae sed
                    sunt. Culpa deleniti ipsam natus nihil quaerat quia quod
                    repellat rerum sint? Amet blanditiis deserunt doloribus
                    eaque, exercitationem in ipsam ipsum iusto maxime natus
                    nostrum nulla, odio, quod sit suscipit. Nam, qui quo?
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import RatingStatusChip from '@/components/custom/RatingStatusChip';
export default {
    components: { RatingStatusChip },
};
</script>
