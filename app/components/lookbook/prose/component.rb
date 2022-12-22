module Lookbook
  class Prose::Component < Lookbook::BaseComponent
    def initialize(size: :md, markdown: true, **html_attrs)
      @size = size
      @markdown = markdown
      super(**html_attrs)
    end

    def rendered_content
      @markdown ? MarkdownRenderer.call(content.strip_heredoc) : helpers.raw(content)
    end

    def size_class
      case @size
      when :sm
        "prose-sm"
      when :lg
        "prose-lg"
      else
        ""
      end
    end
  end
end
