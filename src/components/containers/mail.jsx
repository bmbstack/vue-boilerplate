import Component from 'vue-class-component';
import Vue from 'vue';

@Component
export default class Mail extends Vue {
    render() {
        return (
            <div class="container main">
                <nav>
                    导航
                </nav>
                <div>
                    假装这里有详情
                </div>
            </div>
        );
    }
}
