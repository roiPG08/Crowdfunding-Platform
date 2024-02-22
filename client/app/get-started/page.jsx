export default function Page() {
	return (
		<div className="prose prose-sm mx-auto sm:prose lg:prose-lg">
			<h1 className="">Demo-Page with @tailwindcss-typography Plugin</h1>
			<p className="lead">
				Until now, trying to style an article, document, or blog post with Tailwind has been a tedious task that
				required a keen eye for typography and a lot of complex custom CSS.
			</p>
			<p>
				For more information about how to use the plugin and the features it includes,{' '}
				<a href="https://tailwindcss.com/docs/typography-plugin">read the documentation</a>.
			</p>
			<hr />
			<h2>What to expect from here on out</h2>
			<p>
				Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dignissimos nemo itaque culpa distinctio, sed
				facilis voluptate non temporibus assumenda, fuga, quisquam consequatur ea obcaecati eveniet iure laborum
				suscipit aliquid id?
			</p>
			<ol>
				<li>We want everything to look good out of the box.</li>
				<li>Really just the first reason, that's the whole point of the plugin.</li>
				<li>
					Here's a third pretend reason though a list with three items looks more realistic than a list with
					two items.
				</li>
			</ol>
			<p>Now we're going to try out another header style.</p>
			<h3>Typography should be easy</h3>
			<p>It's probably important that images look okay here by default as well:</p>
			<ul>
				<li>So here is the first item in this list.</li>
				<li>In this example we're keeping the items short.</li>
				<li>Later, we'll use longer, more complex list items.</li>
			</ul>
			<p>And that's the end of this section.</p>
			<h2>What if we stack headings?</h2>
			<h3>We should make sure that looks good, too.</h3>
			<p>
				Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magnam voluptatem, quo aperiam nisi, error
				provident consectetur ex, culpa voluptates minus nihil voluptatibus natus nemo quibusdam laboriosam
				exercitationem dolor. Eveniet, assumenda?
			</p>
			<h3>When a heading comes after a paragraph …</h3>
			<p>
				When a heading comes after a paragraph, we need a bit more space, like I already mentioned above. Now
				let's see what a more complex list would look like.
			</p>
			<p>
				The most annoying thing about lists in Markdown is that
				<code>&lt;li&gt;</code>
				elements aren't given a child
				<code>&lt;p&gt;</code>
				tag unless there are multiple paragraphs in the list item. That means I have to worry about styling that
				annoying situation too.
			</p>
		</div>
	);
}