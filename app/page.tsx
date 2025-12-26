import { getAllArticles, getAllCategories } from '@/lib/articles'
import { HomePageClient } from '@/components/HomePageClient'

export default function Page() {
    const articles = getAllArticles()
    const categories = getAllCategories()
    return <HomePageClient articles={articles} categories={categories} />
}
