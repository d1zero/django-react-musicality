from django.contrib import admin
from .models import *



admin.site.register(FavoriteAlbums)
admin.site.register(FavoriteArtists)
admin.site.register(FavoriteGenres)
admin.site.register(FavoritePlaylists)
admin.site.register(FavoriteTracks)


class ArtistsInline(admin.TabularInline):
    model = Track.artists.through
    extra = 1


@admin.register(Track)
class TrackAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'get_artists', 'date_of_release')
    list_filter = ('id', 'title', 'date_of_release')
    search_fields = ('title',)
    list_display_links = ('title', )

    def get_artists(self, obj):
        return ", ".join([artist.nickname for artist in obj.artists.all()])

    get_artists.short_description = "Артисты"


@admin.register(Album)
class AlbumAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'date_of_release')
    list_filter = ('id', 'name', 'date_of_release')
    search_fields = ('id', 'name',)
    list_display_links = ('id', 'name', )


@admin.register(Artist)
class ArtistAdmin(admin.ModelAdmin):
    list_display = ('id', 'nickname', 'first_name', 'last_name', 'date_of_birth')
    list_filter = ('id', 'nickname', 'first_name', 'last_name', 'date_of_birth')
    search_fields = ('id', 'nickname', 'first_name', 'last_name',)
    list_display_links = ('id', 'nickname', )


@admin.register(Genre)
class GenreAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')
    list_filter = ('id', 'name')
    search_fields = ('id', 'name')
    list_display_links = ('id', 'name', )


@admin.register(Playlist)
class PlaylistAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')
    list_filter = ('id', 'name')
    search_fields = ('id', 'name')
    list_display_links = ('id', 'name', )
