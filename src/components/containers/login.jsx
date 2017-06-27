import Component from 'vue-class-component';
import Vue from 'vue';

@Component
export default class Login extends Vue {

    render() {
        return (
            <div class="container login">
                假装这里有表单, 可以登录
            </div>
        );
    }
}
