import Component from 'vue-class-component';
import Vue from 'vue';

@Component
export default class Mailbox extends Vue {
    render() {
        return (
            <div class="container mailbox">
                <nav>
                    这里是导航
                </nav>
                <div>
                    工具栏
                </div>
                <div>
                    <div>这里是邮件列表</div>
                    <ul>
                        <li>信件1</li>
                        <li>信件2</li>
                        <li>信件3</li>
                        <li>信件4</li>
                        <li>信件5</li>
                        <li>信件6</li>
                    </ul>
                </div>
            </div>
        );
    }
}
