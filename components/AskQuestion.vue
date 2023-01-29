<template>
    <section class="p-4 border rounded-lg shadow-md">
        <form>
            <div class="grid grid-cols-4 gap-x-4 gap-y-3">
                <div class="col-span-3 input-wrapper">
                    <label for="title">Title</label>
                    <input id="title" type="email" name="email" autocomplete="email" required>
                </div>
                <div class="col-span-1 input-wrapper">
                    <label for="location">Location</label>
                    <input id="location" type="text" name="location" required>
                </div>
                <div class="col-span-full input-wrapper">
                    <label for="content">Content</label>
                    <textarea id="content" name="content" required></textarea>
                </div>
                <div class="col-span-full">
                    <button class="button-primary"
                        type="submit">Submit</button>
                </div>
            </div>
        </form>
    </section>
</template>

<script>

</script>