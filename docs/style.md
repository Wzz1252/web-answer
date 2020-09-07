#css规范

## 切换项目主题色

element-ui 进行主题切换

[自定义主题](https://element.eleme.cn/#/zh-CN/component/custom-theme)

[在线主题编辑器](https://element.eleme.cn/#/zh-CN/theme)

[在线主题生成工具](https://elementui.github.io/theme-chalk-preview/#/zh-CN)

## 在项目中改变element SCSS 变量

路径：src/static/assets/theme/element-variables.scss

## css样式命名规范

[BEM规范](https://bemcss.com/)

1. 优势

    1. 更加语义化。
    2. 样式结构更加清晰。
    3. 样式不易污染到组件外。

2. 命名规矩

    ```
        block-name__element-name--modifier-name，也就是模块名 + 元素名 + 修饰器名
    ```

3. 不正确的命名规范
    
    ```html
    <div class="page-btn"> <!-- ... --> <ul class="page-btn__list"> <li class="page-btn__list__item"> <a href="#" class="page-btn__list__item__link">第一页</a> </li> </ul> <!-- ... --> </div>
    ```
    page-btn__list__item__link命名方式这是不对的
    
    1. 首先，有悖BEM命名规范，BEM的命名中只包含三个部分，元素名只占其中一部分，所以不能出现多个元素名的情况，所以上述每一页的按钮名可以改成：page-btn__btn。
       
    2. 其次，有悖BEM思想，BEM是不考虑结构的，比如上面的分页按钮，即使它是在ul列表里面，它的命名也不应该考虑其父级元素。当我们遵循了这个规定，无论父元素名发生改变，或是模块构造发生的改变，还是元素之间层级关系互相变动，这些都不会影响元素的名字。

4. 本项目中css命名
    ```
    .namespace-blockName__elementName--modifierName
    
    namespace ----> kt
    blockName、elementName、modifierName ----> 根据实际模块而定
    
    ``` 
    
    元素名或修饰名可以有自己的结构
    
    ```
    正确：kt-authority__table-operator--disabled (table-operator 属于元素名拥有自己的结构)
    错误：page-btn__list__item__link （元素名过多）
    ```

5. css代码

   BEM 已封装到 src/static/assets/scss/mixins/mixins.scss 可直接引用
   
   ```scss
    /******先引入******/
    @import "../../static/assets/scss/mixins/mixins.scss";
    /******在引用******/
    /******  块  ******/
    @include b(authority) {
        padding: 20px;
        display: flex;
        flex-direction: column;
         /******  元素  ******/
        @include e(title) {
            margin-bottom: 20px;
        }
    }
    /*****翻译如下******/
    .kt-authority {
        padding: 20px;
        display: flex;
        flex-direction: column;
    }
    .kt-authority__title {
        margin-bottom: 20px;
    }
 
   ```
