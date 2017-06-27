import Component from 'vue-class-component';
import Vue from 'vue';

@Component
export default class Editor extends Vue {

    author = "Hello Nix";

    mounted() {
        console.log(this.author)
    }

    render() {
        return (
            <div class="container editor">
                <nav>
                    这里是导航
                </nav>
                <div>
                    作者{this.author}
                </div>
                <div contenteditable="">
                    假装这里有编辑器
                </div>
            </div>
        );
    }
}
