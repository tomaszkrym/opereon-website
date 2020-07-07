<template>
    <div class="sm:relative">
        <search-focus @keyup="focusSearch"></search-focus>

        <div class="relative search-bar">
            <input
                    type="text"
                    placeholder="Search"
                    class="bg-background-form w-full border-2 border-transparent rounded-lg px-4 pl-10 py-2 outline-none focus:border-blue-600"
                    v-model="query"
                    @input="softReset"
                    @keyup="performSearch"
                    @keyup.esc="searchResultsVisible = false"
                    @keydown.up.prevent="highlightPrev"
                    @keydown.down.prevent="highlightNext"
                    @keyup.enter="gotoLink"
                    @blur="searchResultsVisible = false"
                    @focus="searchResultsVisible = true"
                    ref="search"/>
            <div class="absolute top-0 ml-3 mt-3">
                <svg fill="currentColor" class="text-gray-500 h-5 w-5" viewBox="0 0 24 24" width="24" height="24">
                    <path d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
                </svg>
            </div>
            <div v-if="query.length > 0" class="absolute top-0 right-0 text-2xl mr-3 cursor-pointer text-gray-500 hover:text-gray-600" @click="reset">&times;</div>
        </div>
        <transition name="fade">
            <div v-if="query.length > 0 && searchResultsVisible" class="search-results fixed inset-x-0 z-50 overflow-y-auto border-2 border-t-0 rounded-lg rounded-t-none shadow-lg results bg-ui-background bottom:0 sm:bottom-auto sm:absolute border-ui-sidebar" style="max-height: calc(100vh - 120px)">
                <div class="flex flex-col" ref="results">
                    <a v-for="(page, index) in results"
                       :key="index"
                       :href="page.item.path"
                       @click="reset"
                       class="bg-background-form border-b border-gray-400 cursor-pointer p-4 search-hover"
                       :class="{ 'search-highlighted' : index === highlightedIndex }">
                        <span class="resultTittle" v-html="resultTitle(page)"/> <!--hover:text-blue-600 block text-xl-->
                        <span class="resultContent" v-html="resultContent(page)"/> <!--block font-normal text-copy-primary text-sm my-1-->
                    </a>

                    <div v-if="results.length === 0" class="bg-background-form font-normal w-full border-b cursor-pointer p-4">
                        <p class="my-0">No results for '<strong>{{ query }}</strong>'</p>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>


<static-query>
    {
    metadata{
    pathPrefix
    }
    }
</static-query>

<script>
    import axios from 'axios'
    import SearchFocus from './SearchFocus'

    function highlight(match, minLength = 2, maxLines = 5, firstLine = 0) {
        let idx = 0;
        let value = '';
        let skip = true;
        for (const i of match.indices) {
            if (i[1] - i[0] + 1 >= minLength) {
                skip = false
                break
            }
        }
        if (skip) {
            return match.value.split('\n')
                .filter((t, i) => i >= firstLine && i < firstLine + maxLines)
                .join(' ... ')
        }
        for (const i of match.indices) {
            const a = i[0]
            const b = i[1]
            if (b - a + 1 >= minLength) {
                value += match.value.substring(idx, a)
                value += `<span class="search-match">${match.value.substring(a, b + 1)}</span>`
                idx = b + 1;
            }
        }
        value += match.value.substring(idx)
        return value.split('\n')
            .filter(t => t.indexOf('<span class="search-match">') !== -1)
            .filter((t, i) => i >= firstLine && i < firstLine + maxLines)
            .join(' ... ')
    }

    export default {
        components: {
            SearchFocus,
        },
        created() {
            axios(this.$static.metadata.pathPrefix + "/search.json").then(response => {
                this.pages = response.data
            })
                .catch(error => {
                    console.log(error);
                })
        },
        data() {
            return {
                query: '',
                results: [],
                pages: [],
                highlightedIndex: 0,
                searchResultsVisible: false,
                options: {
                    shouldSort: true,
                    includeScore: true,
                    includeMatches: true,
                    findAllMatches: true,
                    threshold: 0.6,
                    location: 0,
                    distance: 5000,
                    maxPatternLength: 32,
                    minMatchCharLength: 1,
                    keys: ['title', 'content']
                }
            }
        },
        methods: {
            reset () {
                this.query = ''
                this.highlightedIndex = 0
            },
            softReset () {
                this.highlightedIndex = 0
                this.searchResultsVisible = true
            },
            performSearch () {
                this.$search(this.query, this.pages, this.options).then(results => {
                    this.results = results
                })
            },
            resultTitle (page) {
                const m = page.matches.find(m => m.key === 'title')
                if (m) {
                    return highlight(m, 2)
                } else {
                    return page.item.title
                }
            },
            resultContent (page) {
                const m = page.matches.find(m => m.key === 'content')
                if (m) {
                    return highlight(m, 2, 5, 1)
                } else {
                    return page.item.content
                        .split('\n')
                        .filter((t, i) => i > 0 && i <= 5)
                        .join(' ... ')
                }
            },
            highlightPrev () {
                if (this.highlightedIndex > 0) {
                    this.highlightedIndex = this.highlightedIndex - 1
                    this.scrollIntoView()
                }
            },
            highlightNext () {
                if (this.highlightedIndex < this.results.length - 1) {
                    this.highlightedIndex = this.highlightedIndex + 1
                    this.scrollIntoView()
                }
            },
            scrollIntoView () {
                this.$refs.results.children[this.highlightedIndex].scrollIntoView({ block: 'nearest' })
            },
            gotoLink () {
                if (this.results[this.highlightedIndex]) {
                    window.location = this.results[this.highlightedIndex].item.path
                }
            },
            focusSearch (e) {
                if (e.key === '/') {
                    this.$refs.search.focus()
                }
            }
        }
    }
</script>

<style lang="scss">
    .search-bar {
        input {
            transition: 0.3s border;
            background-color: var(--color-ui-sidebar);
        }
    }

    .search-results {
        .fade-enter-active, .fade-leave-active {
            transition: opacity .2s;
        }

        .fade-enter, .fade-leave-to {
            opacity: 0;
        }

        .search-match {
            background-color: rgba(yellow, 0.2);
        }
    }

    .resultTittle {
        display: block;
        font-size: 1.25rem;
    }

    .resultContent {
        display: block;
        font-size: .875rem;
        font-weight: 400;
        margin-top: 0.25rem;
        margin-bottom: 0.25rem;
    }

    .flex.flex-col a:hover span.resultContent,
    .flex.flex-col a:hover span.resultTittle {
        color: var(--color-ui-primary);
    }
</style>
