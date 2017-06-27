import Vue from 'vue';
import Component from 'vue-class-component';

import { ROUTES } from '../../routes/appRoute';

@Component
export default class Welcome extends Vue {
    handleNewMail() {
        // this points to this Vue component instance
        window.location.hash = ROUTES.EDITOR;
    }

    render() {
        const { handleNewMail } = this;

        return (
            <div class="conntainer welcome">
                <nav>
                    这里是导航
                </nav>
                <figure>
                    假装有Banner图
                </figure>
                <div>
                    <button v-tap={ handleNewMail }>写信</button>
                </div>
            </div>
        );
    }
}
